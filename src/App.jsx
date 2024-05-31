import { Box, Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import Soon from './assets/soon.png';
import TextDec from './assets/text-dec.svg';
import { useNavigate } from 'react-router-dom';
import LogoImage from './assets/Logo.png';
import facebook from './assets/facebook.svg';
import instagram from './assets/instagram.svg';
import linkedin from './assets/linkedin.png';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';

function App() {



  const [isSubscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, reset, handleSubmit, formState: { errors } } = useForm();

  const subscribeEmail = async (data) => {
    try {
      console.log(data);
      setIsLoading(true);
      let res = await axios.post('https://gnana-prakasam.onrender.com/hawr-subscribe', data);
      if (res.data.message) {
        toast.success(res.data.message);
      };
      reset();
      setIsLoading(false)
      setSubscribed(true);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.error) {
        toast.error(error.response.data.error)
      }
    }
  }






  const onSubmit = (data) => {
    subscribeEmail(data);
  };

  return (
    <Box sx={{
      backgroundColor: "#1E2551",
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${Soon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box',
      py: 2,
      animation: { xs: 'runningBackground 20s linear infinite', md: 'runningBackground 5s linear infinite' },
    }}>
      <Typography variant='h6' sx={{
        fontFamily: "Poppins",
        fontWeight: 600,
        color:'white'
      }}>
        Hawr Technologies
      </Typography>
      <Box>
        <motion.div
          initial={{ opacity: 0, y: '50%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.5, duration: 2, type: 'spring' }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            gap: 2
          }}>
            <img src={TextDec} className='animated-circles' alt="" />
            <Typography component='h3' variant='h3' sx={{
              fontFamily: 'Poppins',
              fontSize: { xs: '32px', md: '42px' },
            }}>Site Under Maintenance</Typography>
            <img className='animated-circles' src={TextDec} alt="" />
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '50%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.5, duration: 2, type: 'spring', delay: 0.5 }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2
          }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Subscribe"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      backgroundColor: "transparent",
                      borderRadius: '20px',
                      padding: '0px',
                      minHeight: '1rem',
                      justifySelf: 'center',
                      '& input': {
                        padding: '10px',
                        minHeight: '1rem',
                        paddingRight: 0,
                        color: 'white',
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                      '& .MuiOutlinedInput-root': {
                        border: '1px solid #166493',
                        borderRadius: '20px',
                        '&:hover': {
                          border: '1px solid #166493',
                          borderRadius: '20px'
                        },
                        '&.Mui-focused': {
                          border: '1px solid #166493',
                          borderRadius: '20px'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid #166493',
                          borderRadius: '20px'
                        },
                        // Apply padding-right: 0 specifically to the outlined input root
                        padding: 0.5
                      },

                    }}
                    InputProps={{
                      endAdornment: (
                        <Button
                          type='submit'
                          disabled={isLoading || isSubscribed}
                          sx={{
                            borderRadius: '20px',
                            minHeight: '3rem',
                            width: '10rem',
                            fontFamily: 'Poppins',
                            ":disabled": {
                              backgroundColor: "#27AE60",
                              color: 'white'
                            }
                          }} variant='contained'

                          onClick={handleSubmit}
                        >
                          {isLoading ? <CircularProgress size={24} style={{
                            color: 'white'
                          }} /> : (isSubscribed ? 'Subscribed' : 'Subscribe')}
                        </Button>
                      ),
                    }}
                  />
                )}
              />
            </form>
          </Box>
        </motion.div>
      </Box>

      <Box component='div' sx={{
        display: 'flex',
        gap: 1
      }}>
        <Box sx={{
          background: "#166493",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40px',
          padding: '10px'

        }}>
          <img src={facebook} alt="" />
        </Box>
        <Box sx={{
          background: "#166493",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40px',
          padding: '10px'

        }}>
          <img src={linkedin} alt="" />
        </Box>
        <Box sx={{
          background: "#166493",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40px',
          padding: '10px'

        }}>
          <img src={instagram} alt="" />
        </Box>
      </Box>
      <Toaster />
    </Box>
  )
}

export default App
