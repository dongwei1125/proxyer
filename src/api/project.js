import http from './httpInstance'

export const getProjectList = data => http.post('/api/project/list', data)

export const createProject = data => http.post('/api/project/create', data)

export const updateProject = data => http.post('/api/project/update', data)

export const deleteProject = data => http.post('/api/project/delete', data)
