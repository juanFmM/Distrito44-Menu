import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { initialCategories, initialItems } from '../data/initialMenu'

// Fallback a localStorage si no hay Supabase configurado
const USE_SUPABASE = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://tu-proyecto.supabase.co'
)

function loadLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function sbFetchAll() {
  const [cRes, iRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order').order('created_at'),
    supabase.from('items').select('*').order('sort_order').order('created_at'),
  ])
  if (cRes.error) throw cRes.error
  if (iRes.error) throw iRes.error
  return { categories: cRes.data, items: iRes.data }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMenuData() {
  const [categories, setCategories] = useState([])
  const [items, setItems]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [dbError, setDbError]       = useState(null)

  // Seed localStorage with initial data if empty
  useEffect(() => {
    if (!USE_SUPABASE) {
      const cats  = loadLocal('d44_categories', initialCategories)
      const itms  = loadLocal('d44_items', initialItems)
      setCategories(cats)
      setItems(itms)
      setLoading(false)
      return
    }

    sbFetchAll()
      .then(({ categories: cats, items: itms }) => {
        setCategories(cats)
        setItems(itms)
      })
      .catch((err) => setDbError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Persist to localStorage when not using Supabase
  useEffect(() => {
    if (!USE_SUPABASE && !loading) {
      localStorage.setItem('d44_categories', JSON.stringify(categories))
    }
  }, [categories, loading])

  useEffect(() => {
    if (!USE_SUPABASE && !loading) {
      localStorage.setItem('d44_items', JSON.stringify(items))
    }
  }, [items, loading])

  // ── Categories ──────────────────────────────────────────────────────────────

  async function addCategory(cat) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('categories')
        .insert({ ...cat, sort_order: categories.length })
        .select()
        .single()
      if (error) throw error
      setCategories((prev) => [...prev, data])
    } else {
      const newCat = { ...cat, id: `cat_${Date.now()}` }
      setCategories((prev) => [...prev, newCat])
    }
  }

  async function updateCategory(id, updates) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('categories').update(updates).eq('id', id)
      if (error) throw error
    }
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  async function deleteCategory(id) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
    }
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setItems((prev) => prev.filter((i) => i.categoryId !== id && i.category_id !== id))
  }

  // ── Items ───────────────────────────────────────────────────────────────────

  async function addItem(item) {
    if (USE_SUPABASE) {
      const row = {
        category_id: item.categoryId,
        name:        item.name,
        description: item.description,
        price:       item.price,
        badge:       item.badge || null,
        image_url:   item.imageUrl || null,
        sort_order:  items.length,
      }
      const { data, error } = await supabase.from('items').insert(row).select().single()
      if (error) throw error
      // Normalize to camelCase for UI
      setItems((prev) => [...prev, normalizeItem(data)])
    } else {
      const newItem = { ...item, id: `item_${Date.now()}` }
      setItems((prev) => [...prev, newItem])
    }
  }

  async function updateItem(id, updates) {
    if (USE_SUPABASE) {
      const row = {
        category_id:  updates.categoryId ?? updates.category_id,
        name:         updates.name,
        description:  updates.description,
        price:        updates.price,
        badge:        updates.badge || null,
        image_url:    updates.imageUrl || null,
        sales_count:  updates.sales_count ?? undefined,
      }
      // Eliminar campos undefined para no sobreescribir lo que no cambia
      Object.keys(row).forEach(k => row[k] === undefined && delete row[k])
      const { error } = await supabase.from('items').update(row).eq('id', id)
      if (error) throw error
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)))
  }

  async function deleteItem(id) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('items').delete().eq('id', id)
      if (error) throw error
    }
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  // ── Upload image to Supabase Storage ────────────────────────────────────────

  async function uploadImage(file) {
    if (!USE_SUPABASE) return null
    const ext  = file.name.split('.').pop()
    const path = `menu/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('menu-images').upload(path, file)
    if (error) throw error
    const { data } = supabase.storage.from('menu-images').getPublicUrl(path)
    return data.publicUrl
  }

  // ── Reset ───────────────────────────────────────────────────────────────────

  async function resetToDefault() {
    if (USE_SUPABASE) {
      await supabase.from('items').delete().neq('id', '')
      await supabase.from('categories').delete().neq('id', '')

      const { data: cats } = await supabase
        .from('categories')
        .insert(initialCategories.map((c, i) => ({ ...c, sort_order: i })))
        .select()

      const catMap = {}
      cats?.forEach((c) => { catMap[c.id] = c.id })

      await supabase.from('items').insert(
        initialItems.map((item, i) => ({
          category_id: item.categoryId,
          name:        item.name,
          description: item.description,
          price:       item.price,
          badge:       item.badge || null,
          sort_order:  i,
        }))
      )

      const { categories: freshCats, items: freshItems } = await sbFetchAll()
      setCategories(freshCats)
      setItems(freshItems.map(normalizeItem))
    } else {
      setCategories(initialCategories)
      setItems(initialItems)
    }
  }

  return {
    categories,
    items: items.map((i) => normalizeItem(i)),
    loading,
    dbError,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
    uploadImage,
    resetToDefault,
    usingSupabase: USE_SUPABASE,
  }
}

// Normaliza snake_case de Supabase a camelCase para el UI
function normalizeItem(item) {
  if (!item) return item
  return {
    ...item,
    categoryId:  item.category_id  ?? item.categoryId,
    sales_count: item.sales_count  ?? 0,
    imageUrl:   item.image_url   ?? item.imageUrl ?? null,
  }
}
