import UpdateProfileForm from '@/components/forms/UpdateProfileForm'
import React from 'react'

const UpdateProfile = () => {
  return (
    <div className="flex flex-1">
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
                src="/assets/icons/edit1.svg"
                width={36}
                height={36}
                alt="add"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2> 
          </div>
            <UpdateProfileForm />
        </div>
      </div>
  )
}

export default UpdateProfile