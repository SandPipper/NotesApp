export const CATEGORIES = {
  ADD: 'ADD_CATEGORIE',
  REMOVE: 'REMOVE_CATEGORIE',
};

export function addCategorieAction(categories) {
  return { type: CATEGORIES.ADD, payload: categories };
};

export function removeCategorieAction(title) {
  console.log('title_remove', title);
  return { type: CATEGORIES.REMOVE, payload: title };
}
