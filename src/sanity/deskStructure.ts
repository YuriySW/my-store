import type { StructureResolver } from 'sanity/desk'

export const deskStructure: StructureResolver = (S) =>
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
                  S.listItem()
                    .title('Подкатегории')
                    .child(
                      S.documentList()
                        .title('Подкатегории')
                        .schemaType('category')
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
                              S.listItem()
                                .title('Товары')
                                .child(
                                  S.documentTypeList('product')
                                    .title('Товары')
                                    .filter(
                                      `_type == "product" && category._ref == $subcategoryId`,
                                    )
                                    .params({ subcategoryId })
                                    .initialValueTemplates([
                                      S.initialValueTemplateItem('product-by-category', {
                                        categoryId: subcategoryId,
                                      }),
                                    ]),
                                ),
                            ]),
                        ),
                    ),
                ]),
            ),
        ),
      S.divider(),
      S.listItem().title('Все товары').child(S.documentTypeList('product').title('Все товары')),
      S.listItem()
        .title('Товары без категории')
        .child(
          S.documentList()
            .title('Товары без категории')
            .schemaType('product')
            .filter(`_type == "product" && !defined(category)`),
        ),
    ])

