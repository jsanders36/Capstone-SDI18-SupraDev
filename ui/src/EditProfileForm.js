import React from 'react';
import styled from '@emotion/styled';
import { TextField, Button, TextareaAutosize, Box } from '@mui/material';

const EditProfileFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 4px solid #000;
  border-radius: 16px;
  padding: 16px;
  width: 17%;

  .form-group {
    width: 100%;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 8px 16px;
    }
  }
`;

const EditProfileForm = ({ user, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = React.useState(user.first_name);
  const [lastName, setLastName] = React.useState(user.last_name);
  const [jobTitle, setJobTitle] = React.useState(user.job_title);
  const [profilePic, setProfilePic] = React.useState(user.profile_pic);
  const [userSummary, setUserSummary] = React.useState(user.user_summary);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      job_title: jobTitle,
      profile_pic: profilePic,
      user_summary: userSummary,
    };
    onSubmit(updatedUser)
      .then(() => {
        onCancel(); // Close the form
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <EditProfileFormContainer>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            fullWidth
            label="Profile Picture URL"
            variant="outlined"
            id="profilePic"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextareaAutosize
            rowsMin={4}
            fullWidth
            label="User Summary"
            variant="outlined"
            id="userSummary"
            value={userSummary}
            onChange={(e) => setUserSummary(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
          <Button type="button" onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </div>
      </form>
    </EditProfileFormContainer>
  );
};

export default EditProfileForm;

// import React from 'react';
// import styled from '@emotion/styled';
// import { TextField, Button, TextareaAutosize } from '@mui/material';

// const useStyles = styled((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: theme.spacing(2),
//   },
//   buttonGroup: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(0),
//   },
// }));




// const EditProfileForm = ({ user, onSubmit, onCancel }) => {
//   const classes = useStyles();
//   const [firstName, setFirstName] = React.useState(user.first_name);
//   const [lastName, setLastName] = React.useState(user.last_name);
//   const [jobTitle, setJobTitle] = React.useState(user.job_title);
//   const [profilePic, setProfilePic] = React.useState(user.profile_pic);
//   const [userSummary, setUserSummary] = React.useState(user.user_summary);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedUser = {
//       first_name: firstName,
//       last_name: lastName,
//       job_title: jobTitle,
//       profile_pic: profilePic,
//       user_summary: userSummary,
//     };
//     onSubmit(updatedUser)
//     .then(() => {
//       onCancel(); // Close the form
//     })
//     .catch((error) => {
//       console.error(error); // Handle error
//     });
//   };

//   return (
//     <div className="edit-profile-form">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="jobTitle">Job Title:</label>
//           <input
//             type="text"
//             id="jobTitle"
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="profilePic">Profile Picture URL:</label>
//           <input
//             type="text"
//             id="profilePic"
//             value={profilePic}
//             onChange={(e) => setProfilePic(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="userSummary">User Summary:</label>
//           <textarea
//             id="userSummary"
//             value={userSummary}
//             onChange={(e) => setUserSummary(e.target.value)}
//           />
//         </div>
//         <div className="form-actions">
//           <button type="submit" onSubmit={handleSubmit}>Update Profile</button>
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProfileForm;
