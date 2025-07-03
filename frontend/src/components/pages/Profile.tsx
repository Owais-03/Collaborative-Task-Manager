import { useState } from 'react'
import Navbar from '../shared/Navbar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import UpdateProfileDialog from './UpdateProfileDialog'

const Profile = () => {
  const [open, setOpen] = useState(false)
  const { user } = useSelector((store: RootState) => store.auth)

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5 }}>
        <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            {/* Use basic HTML for layout to avoid Grid TS errors */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                  sx={{ width: 96, height: 96 }}
                />
                <div>
                  <Typography variant="h5" fontWeight="medium">
                    {user?.fullname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.profile?.bio}
                  </Typography>
                </div>
              </div>
              <div>
                <IconButton onClick={() => setOpen(true)} color="primary">
                  <EditIcon />
                </IconButton>
              </div>
            </div>
            <Box mt={4}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body1">{user?.email}</Typography>
                  </Box>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ContactPhoneIcon fontSize="small" />
                    <Typography variant="body1">{user?.phoneNumber}</Typography>
                  </Box>
                </div>
              </div>
            </Box>
            <Box mt={4}>
              <Typography variant="body2" color="text.secondary">
                {user?.updatedAt
                  ? `Profile Updated on - ${new Date(user.updatedAt).toLocaleString()}`
                  : 'N/A'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {/* Bio Section */}
        <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 1, mt: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.profile?.bio
                ? user.profile.bio
                : 'No bio set. Click the edit button to add your bio.'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile