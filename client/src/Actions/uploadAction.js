import * as UploadApi from '../api/UploadRequest'


export const uploadImage = (data)=> async (dispatch)=>{
    try {
        console.log(data)
        let res=  await UploadApi.uploadImage(data)
        console.log(res,'-----image uploading----upload action')
      console.log(res);
    } catch (error) {
     console.log(error)   
    }
}

export const uploadPost = (data)=>async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        console.log(newPost,'---------newPost')
        dispatch({type: "UPLOAD_SUCCESS", data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type: "UPLOAD_FAIL"})
    }
}
export const uploadComment = (data)=>async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newComment = await UploadApi.uploadComment(data).then((response) => {
        console.log(newComment,"new aa----------------")
        // dispatch({type: "UPLOAD_SUCCESS", data:newComment.data})
        return response
    })
    } catch (error) {
        console.log(error)
        dispatch({type: "UPLOAD_FAIL"})
    }
}



