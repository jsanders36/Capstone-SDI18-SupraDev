import { useCookies, CookiesProvider } from 'react-cookie';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Attachment01 from '../icons/attachment-01';
import FaceSmile from '../icons/face-smile';
import Image01 from '../icons/image-01';
import Link01 from '../icons/link-01';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
// import useMediaQuery from '@mui/material/useMediaQuery';

import { useMockedUser } from '../hooks/use-mocked-user';
import { getInitials } from '../utils/get-initials';

export const SocialPostAdd = (props) => {
  const user = useMockedUser();
  // const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const { id } = useParams();
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])
  const [userObj, setUserObj] = useState([]);

  const userRefetch = async () => {
    const userId = id ? id : sessionCookies.user_id_token;
    await fetch(`http://localhost:8080/users/${userId}`)
        .then((res) => res.json())
        .then((fetchData) => setUserObj(fetchData[0]))
  }

  useEffect(() => {
    userRefetch();
  }, [])

  return (
    <Card {...props}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >
          <Avatar
            src={userObj.profile_pic}
            sx={{
              height: 40,
              width: 40,
              borderColor:"black"
            }}
          >
            {userObj.profile_pic}
          </Avatar>
          <Stack
            spacing={3}
            sx={{ flexGrow: 1 }}
          >
            <OutlinedInput
              fullWidth
              multiline
              placeholder="Sharing is caring... What's on your mind?"
              rows={3}
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >

                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <IconButton>
                    <SvgIcon>
                      <Image01 />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01 />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Link01 />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmile />
                    </SvgIcon>
                  </IconButton>
                </Stack>
              <div>
                <Button variant="contained">Post</Button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};