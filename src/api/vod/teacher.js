import request from '@/utils/request'

const api_name = '/admin/vod/teacher'

export default {
    pageList(page, limit, searchObj) { 
        return request({
        url: `${api_name}/${page}/${limit}`,
        method: 'post',
        data: searchObj
        })
    },

    removeById(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'delete'
        })
    },

    save(teacher){
        return request({
            url: `${api_name}/saveTeacher`,
            method: 'post',
            data: teacher
        })
    },
    getById(id) {
        return request({
            url: `${api_name}/getTeacher/${id}`,
            method: `get`
        })
    },

    updateById(teacher){
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: teacher
        })
    },

    batchRemove(idList){
        return request({
            url: `${api_name}/removeBatch`,
            method: 'post',
            data: idList
        })
    }

}
