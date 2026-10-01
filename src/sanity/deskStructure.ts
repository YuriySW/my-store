import type {StructureResolver} from 'sanity/desk'
import {GenerateIcon, SortIcon} from '@sanity/icons'
import {
  OrderableDocumentList,
  orderableDocumentListDeskItem,
} from '@sanity/orderable-document-list'

const API_VERSION = '2023-05-03'

type StructureBuilder = Parameters<StructureResolver>[0]
type StructureContext = Parameters<StructureResolver>[1]

function orderablePaneMenuItems(
  S: StructureBuilder,
  extra: ReturnType<ReturnType<StructureBuilder['menuItem']>['serialize']>[],
) {
  return [
    ...extra,
    S.menuItem()
      .title('Reset Order')
      .icon(GenerateIcon)
      .action('resetOrder')
      .serialize(),
    S.menuItem()
      .title('Toggle Increments')
      .icon(SortIcon)
      .action('showIncrements')
      .serialize(),
  ]
}

function orderableProductsInCategory(
  S: StructureBuilder,
  context: StructureContext,
  categoryId: string,
  listId: string,
) {
  return orderableDocumentListDeskItem({
    type: 'product',
    title: 'Товары',
    id: listId,
    filter: `_type == "product" && category._ref == $categoryId`,
    params: {categoryId},
    // иначе create товара перехватывает «+» у категорий/подкатегорий
    createIntent: false,
    menuItems: [
      S.menuItem()
        .title('Добавить товар')
        .intent({
          type: 'create',
          params: {
            type: 'product',
            template: 'product-by-category',
            categoryId,
          },
        })
        .serialize(),
    ],
    S,
    context,
  })
}

/** Orderable list с кастомным child (панель категории), createIntent: false */
function orderableCategoryListPane(
  S: StructureBuilder,
  context: StructureContext,
  options: {
    id: string
    title: string
    filter: string
    params?: Record<string, unknown>
    menuItems: ReturnType<ReturnType<StructureBuilder['menuItem']>['serialize']>[]
    child: (documentId: string) => ReturnType<StructureBuilder['list']>
  },
) {
  const {id, title, filter, params = {}, menuItems, child} = options
  const client = context.getClient({apiVersion: API_VERSION})

  // как в orderableDocumentListDeskItem — без этого GROQ падает на $currentVersion
  const maybeStack = Reflect.get(context, 'perspectiveStack')
  const perspectiveStack =
    Array.isArray(maybeStack) && maybeStack.every((item) => typeof item === 'string')
      ? (maybeStack as string[])
      : []
  const currentVersion = perspectiveStack[0] ?? 'drafts'

  return Object.assign(
    S.documentList()
      .id(id)
      .title(title)
      .schemaType('category')
      .apiVersion(API_VERSION)
      .filter(filter)
      .params(params)
      .canHandleIntent(() => false)
      .child(child)
      .serialize(),
    {
      __preserveInstance: true,
      key: id,
      type: 'component',
      component: OrderableDocumentList,
      options: {type: 'category', filter, params, client, currentVersion},
      menuItems: orderablePaneMenuItems(S, menuItems),
    },
  )
}

function categoryPane(
  S: StructureBuilder,
  context: StructureContext,
  categoryId: string,
  title: string,
): ReturnType<StructureBuilder['list']> {
  return S.list()
    .title(title)
    .items([
      S.listItem()
        .title('Редактировать')
        .child(S.document().schemaType('category').documentId(categoryId)),
      S.divider(),
      orderableProductsInCategory(
        S,
        context,
        categoryId,
        `orderable-products-${categoryId}`,
      ),
      S.listItem()
        .title('Подкатегории')
        .child(
          orderableCategoryListPane(S, context, {
            id: `subcategories-${categoryId}`,
            title: 'Подкатегории',
            filter: `_type == "category" && parent._ref == $categoryId`,
            params: {categoryId},
            menuItems: [
              S.menuItem()
                .title('Добавить подкатегорию')
                .intent({
                  type: 'create',
                  params: {
                    type: 'category',
                    template: 'subcategory-by-parent',
                    parentId: categoryId,
                  },
                })
                .serialize(),
            ],
            child: (subcategoryId) =>
              categoryPane(S, context, subcategoryId, 'Подкатегория'),
          }),
        ),
    ])
}

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Категории')
        .child(
          orderableCategoryListPane(S, context, {
            id: 'main-categories',
            title: 'Основные категории',
            filter: `_type == "category" && !defined(parent)`,
            menuItems: [
              S.menuItem()
                .title('Добавить категорию')
                .intent({
                  type: 'create',
                  params: {type: 'category'},
                })
                .serialize(),
            ],
            child: (categoryId) =>
              categoryPane(S, context, categoryId, 'Категория'),
          }),
        ),
      S.divider(),
      // обычный список — НЕ orderable: иначе перехватывает create категорий
      S.listItem()
        .title('Все товары')
        .child(
          S.documentTypeList('product')
            .title('Все товары')
            .apiVersion(API_VERSION)
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Товары без категории')
        .child(
          S.documentList()
            .title('Товары без категории')
            .schemaType('product')
            .apiVersion(API_VERSION)
            .filter(`_type == "product" && !defined(category)`),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'portfolioItem',
        title: 'Портфолио',
        id: 'orderable-portfolio',
        S,
        context,
      }),
    ])
