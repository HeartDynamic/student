import axios from 'axios'
import Cookies from 'js-cookie'

export const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://api.likeyun.net' : '',
    baseURL: 'http://192.168.0.104:8080/step',
    // baseURL: 'https://api.likeyun.net',
    timeout: 5000,
})

let isConfig = true
let isError = true

let getPlanList = async () => {
    try {
        const res = await auth.getRefreshToken()
        Cookies.set('token', res.data.jwtToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        Cookies.set('uploadToken', res.data.uploadToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        instance.defaults.headers.common['Authorization'] = 'Basic ' + res.data.jwtToken
    } catch (error) {}
}

instance.interceptors.response.use(
    function(config) {
        if (config && config.data.code === 4205) {
            if (isConfig) {
                getPlanList()
                isConfig = false
            }
        }
        return config
    },
    function(error) {
        // 对请求错误做些什么
        console.log(error.response, 123)
        if (error && error.response.data.code === 4004) {
            if (isError) {
                Cookies.remove('token')
                Cookies.remove('uploadToken')
                window.location.href =
                    process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
                isError = false
            }
        } else if (error && error.response.data.code === 4005) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        } else if (error && error.response.data.code === 4016) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        }
    }
)

if (isConfig) {
    if (Cookies.get('token')) {
        instance.defaults.headers.common['Authorization'] = 'Basic ' + Cookies.get('token')
    }
}

const request = {
    get: async (url: string, data?: any) => {
        try {
            const res = await instance.get(url, {
                params: data,
            })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    post: async (url: string, data: object) => {
        try {
            const res = await instance.post(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    put: async (url: string, data?: object) => {
        try {
            const res = await instance.put(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    del: async (url: string) => {
        try {
            const res = await instance.delete(url)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
}
const auth = {
    getCaptcha: () => request.get('/captchas/base64'),
    getRefreshToken: () => request.get('/refresh-token'),
    logOut: () => request.del('/logout'),
}
const user = {
    getUserInfo: () => request.get('/user-info'),
}

const main = {
    getAllTestList: (data: any) => request.get('/students/all/test-lists', data),
    getTaskTestList: (data: any) => request.get('/students/task/test-lists', data),
}

const answer = {
    getTestProblem: (id: number) => request.get(`/students/test-problem/${id}`),
    getTestProblemEntering: (id: number) => request.get(`/students/test-problem/entering/${id}`),
    getTestProblemDetail: (data: any) => request.get(`/students/test-problem-detail/${data.testId}/${data.id}`),
    getTestProblemAnswer: (data: any) => request.get(`/students/test-problem-answer/${data.testId}/${data.id}`),
    getTestProblemUnentering: (id: number) => request.get(`/students/test-problem/unentering/${id}`),
    getStudentTest: (id: number) => request.get(`/course/student-test/${id}`),
    getStudentTestProblem: (data: any) => request.get(`/course/student-test/${data.testId}/${data.id}`),
    saveEndEntering: (id: number) => request.put(`/students/end-entering/${id}`),
    addDoProblem: (data: any) => request.put(`/student/do-problem`, data),
    addDoProblemMark: (id: number) => request.put(`/students/test-problem/mark/${id}`),
    saveTestSubmit: (id: number) => request.put(`/students/test/submit/${id}`),
    getTestsStatu: (id: number) => request.get(`/students/tests/${id}`),
    getTestsEntering: (data: any) => request.put(`/students/entering`, data),
}
const classTable = {
    getClassTable: () => request.get('/courses/times/using'),
    getCourses: (data: any) => request.get('/students/courses', data),
}

const practise = {
    getDailyProblem: () => request.get('/student/daily-problem/get'),
    postDailyProblem: (data: any) => request.post('/student/daily-problem/update', data),
}

export default {
    auth,
    user,
    main,
    answer,
    classTable,
    practise,
}
