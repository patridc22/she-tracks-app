---
paths: src/lib/**/*.js, src/lib/**/*.ts, src/hooks/**/*.js, src/hooks/**/*.ts, src/services/**/*.js, src/services/**/*.ts
---

# Utility & Shared Code Rules

## Before Writing Any Utility

1. **Search first** - Check if it exists in `src/lib/`
2. **Don't duplicate** - If it exists, import and use it
3. **Share early** - If used in 2+ places, move to `src/lib/`

## Consolidated Files

| File | Purpose |
|------|---------|
| `src/lib/dateUtils.js` | All date formatting, calculations, ranges |
| `src/lib/formatters.js` | Currency, names, text truncation |
| `src/lib/validators.js` | Email, phone, form validation |
| `src/lib/constants.js` | App-wide constants |
| `src/services/api.js` | Base API wrapper |

## Size Limits

| File Type | Max Lines | When Exceeded |
|-----------|-----------|---------------|
| Utility file | 150 | Split into folder with index.js |
| Custom hook | 100 | Extract sub-hooks |
| Service file | 150 | Split by entity |

## Custom Hooks

Every data source gets its own hook:

```javascript
// src/features/posts/hooks/usePosts.js
export function usePosts(id) {
  // Encapsulates ALL posts data logic
  // Returns: { data, loading, error, refresh, create, update, delete }
}
```

Benefits:
- Components stay focused on UI
- Logic is testable
- Reusable across pages
- Consistent loading/error states

## Service Layer

API calls live in services, not components:

```javascript
// src/features/posts/services/postService.js
export const postService = {
  getAll: () => api.get('/posts'),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
};
```
