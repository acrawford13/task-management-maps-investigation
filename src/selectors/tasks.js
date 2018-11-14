export const getTaskByID = id => state => state.tasks.get(id);
export const getTaskByIDJS = id => state => state.tasks.get(id).toJS();
