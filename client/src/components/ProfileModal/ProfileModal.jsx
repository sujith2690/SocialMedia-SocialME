import { Modal, useMantineTheme } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../../Actions/uploadAction'
import { updateUser } from '../../Actions/UserAction'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import './ProfileModal.css'
import { useState } from 'react'
import { profileSchema } from '../../schemas'
import Spinner from '../Spinner/Spinner'

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const param = useParams()
  const { Notifications, followers, following, isBlock, isUser, password, saved, verified, username, ...initialData } = data
  console.log(initialData, '-------------------data in profile modal');
  // const { password, isAdmin, ...initialData } = data
  const [profileImage, setProfileImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [coverImage, setCoverImage] = useState(null)

  const notify = () => toast.error('Unsupported Format')

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      if (['image/png', 'image/gif', 'image/jpeg', 'image/jpg'].includes(img.type)) {
        event.target.name === "profileImage"
          ? setProfileImage(img)
          : setCoverImage(img)
      } else {
        notify()
      }
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialData,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true)
      console.log(values, '---------------values')
      try {
        let userData = { ...values }

        if (profileImage) {
          const data = new FormData()
          const fileName = Date.now() + profileImage.name
          data.append("name", fileName)
          data.append("file", profileImage)
          userData.profilePicture = fileName
          dispatch(uploadImage(data))
        }

        if (coverImage) {
          const data = new FormData()
          const fileName = Date.now() + coverImage.name
          data.append("name", fileName)
          data.append("file", coverImage)
          userData.coverPicture = fileName
          dispatch(uploadImage(data))
        }

        dispatch(updateUser(param.id, userData))
        toast.success("Profile updated successfully!")
        setModalOpened(false)
        setLoading(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        setLoading(false)
        return
      }
    },
  })

  const closeModal = () => {
    setModalOpened(false)
    setLoading(false)
  }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      onClose={closeModal}
      styles={{
        modal: {
          width: '90%',
          maxWidth: '90%',
          '@media (min-width: 768px)': {
            width: '55%',
            maxWidth: '55%',
          },
        },
      }}
    >
      <form className='infoForm' onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        <div className='formName'>
          <div className=''>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First Name"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstname && touched.firstname && <span className="form-error">{errors.firstname}</span>}
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last Name"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastname && touched.lastname && <span className="form-error">{errors.lastname}</span>}
          </div>
        </div>

        <div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Works At"
              value={values.worksAt}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.worksAt && touched.worksAt && <span className="form-error">{errors.worksAt}</span>}
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="livesIn"
              placeholder="Lives In"
              value={values.livesIn}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.livesIn && touched.livesIn && <span className="form-error">{errors.livesIn}</span>}
          </div>
        </div>
        <div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.country && touched.country && <span className="form-error">{errors.country}</span>}
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="relationship"
              placeholder="Relationship Status"
              value={values.relationship}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.relationship && touched.relationship && <span className="form-error">{errors.relationship}</span>}
          </div>
        </div>

        <div className="imageSection">
          <div>
            <p>Profile Image</p>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div>
            <p>Cover Image</p>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>
        {
          loading ?
            <Spinner />
            : <button type="submit" className="button infoButton">
              Update
            </button>
        }

      </form>
    </Modal>
  )
}

export default ProfileModal
