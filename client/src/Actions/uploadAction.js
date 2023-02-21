import * as UploadApi from '../api/UploadRequest'


export const uploadImage = (data)=> async (dispatch)=>{
    try {
        let res=  await UploadApi.uploadImage(data)
    } catch (error) {
     console.log(error)   
    }
}

export const uploadPost = (data)=>async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "UPLOAD_SUCCESS", data:newPost.data})
    } catch (error) {
        console.log(error,'-------upload action')
        dispatch({type: "UPLOAD_FAIL"})
    }
}
export const uploadComment = (data)=>async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newComment = await UploadApi.uploadComment(data).then((response) => {
        return response
    })
    } catch (error) {
        console.log(error)
        dispatch({type: "UPLOAD_FAIL"})
    }
}



