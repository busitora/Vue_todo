import axios from 'axios'
// ここで node_moduleのaxios.jsからimportしている

const axiosInstance = axios.create({
	baseURL: 'api'
	// baseurlで apiを叩くとapiから生えるように
})

export default axiosInstance
// axiosInstance で使えるようにexportする
