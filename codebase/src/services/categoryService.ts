import type { Category } from '../types/category'
import { readStorage, writeStorage } from './storageService'
import { seedCategories } from '../utils/seedData'
import { generateId } from '../utils/idUtils'

const CATEGORY_KEY = 'perry-2026-categories'

export const loadCategories = (): Category[] => readStorage<Category[]>(CATEGORY_KEY, seedCategories)

export const saveCategories = (categories: Category[]) => {
  writeStorage(CATEGORY_KEY, categories)
}

export const createCategory = (categories: Category[], name: string, color: string): Category[] => {
  const newCategory: Category = {
    id: generateId(),
    name,
    color,
  }

  return [newCategory, ...categories]
}
