import type { StructureResolver } from 'sanity/desk'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

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
    S,
    context,
  })
}

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Категории')
        .child(
          S.documentTypeList('category')
            .title('Основные категории')
            .filter(`_type == "category" && !defined(parent)`)
            .child((parentCategoryId) =>
              S.list()
                .title('Категория')
                .items([
                  S.listItem()
                    .title('Редактировать категорию')
                    .child(
                      S.document().schemaType('category').documentId(parentCategoryId),
                    ),
                  S.divider(),
                  orderableProductsInCategory(
                    S,
                    context,
                    parentCategoryId,
                    `orderable-products-parent-${parentCategoryId}`,
                  ),
                  S.listItem()
                    .title('Подкатегории')
                    .child(
                      S.documentTypeList('category')
                        .title('Подкатегории')
                        .filter(`_type == "category" && parent._ref == $parentCategoryId`)
                        .params({ parentCategoryId })
                        .initialValueTemplates([
                          S.initialValueTemplateItem('subcategory-by-parent', {
                            parentId: parentCategoryId,
                          }),
                        ])
                        .child((subcategoryId) =>
                          S.list()
                            .title('Подкатегория')
                            .items([
                              S.listItem()
                                .title('Редактировать подкатегорию')
                                .child(
                                  S.document()
                                    .schemaType('category')
                                    .documentId(subcategoryId),
                                ),
                              S.divider(),
                              orderableProductsInCategory(
                                S,
                                context,
                                subcategoryId,
                                `orderable-products-sub-${subcategoryId}`,
                              ),
                            ]),
                        ),
                    ),
                ]),
            ),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'product',
        title: 'Все товары',
        id: 'orderable-all-products',
        S,
        context,
      }),
      S.listItem()
        .title('Товары без категории')
        .child(
          S.documentList()
            .title('Товары без категории')
            .schemaType('product')
            .filter(`_type == "product" && !defined(category)`),
        ),
    ])
