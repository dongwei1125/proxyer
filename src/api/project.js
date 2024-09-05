import http from './httpInstance'

export const getProjectList = params => http.get('/api/project/list', { params })

export const createProject = data => http.post('/api/project/create', data)

export const updateProject = data => http.post('/api/project/update', data)

export const deleteProject = data => http.post('/api/project/delete', data)

export const getProjectPort = params => http.get('/api/project/getPort', { params })
