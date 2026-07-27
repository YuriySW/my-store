import type { StructureResolver } from 'sanity/desk'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const API_VERSION = '2023-05-03'

function orderableProductsInCategory(
  S: Parameters<StructureResolver>[0],
  context: Parameters<StructureResolver>[1],
  categoryId: string,
  listId: string,
) {
  return orderableDocumentListDeskItem({
    type: 'product',
    title: 'Товары',
    id: listId,
    filter: `_type == "product" && category._ref == $categoryId`,
    params: { categoryId },
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

function categoryPane(
  S: Parameters<StructureResolver>[0],
  context: Parameters<StructureResolver>[1],
  categoryId: string,
  title: string,
): ReturnType<Parameters<StructureResolver>[0]['list']> {
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
          S.documentList()
            .id(`subcategories-${categoryId}`)
            .title('Подкатегории')
            .schemaType('category')
            .apiVersion(API_VERSION)
            .filter(`_type == "category" && parent._ref == $categoryId`)
            .params({ categoryId })
            .canHandleIntent((intentName, params) => {
              // edit существующих — через child; create — дефолтная форма категории
              if (intentName === 'create') return false
              return intentName === 'edit' && params?.type === 'category'
            })
            .initialValueTemplates([
              S.initialValueTemplateItem('subcategory-by-parent', {
                parentId: categoryId,
              }),
            ])
            .menuItems([
              S.menuItem()
                .title('Добавить подкатегорию')
                .intent({
                  type: 'create',
                  params: {
                    type: 'category',
                    template: 'subcategory-by-parent',
                    parentId: categoryId,
                  },
                }),
            ])
            .child((subcategoryId) =>
              categoryPane(S, context, subcategoryId, 'Подкатегория'),
            ),
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
          S.documentList()
            .id('main-categories')
            .title('Основные категории')
            .schemaType('category')
            .apiVersion(API_VERSION)
            .filter(`_type == "category" && !defined(parent)`)
            .canHandleIntent((intentName, params) => {
              if (intentName === 'create') return false
              return intentName === 'edit' && params?.type === 'category'
            })
            .child((categoryId) =>
              categoryPane(S, context, categoryId, 'Категория'),
            ),
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
    ])
