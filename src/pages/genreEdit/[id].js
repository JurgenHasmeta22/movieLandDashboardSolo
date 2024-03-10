import axios from "axios"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export async function getServerSideProps(context) {
    const { id } = context.params
    const res = await axios(`http://localhost:4000/genresNoPagination/${id}`)
    const genre = res.data
    return {
        props: { genre }
    }
}

export default function GenreEdit({ genre }) {
    return (
        <>
            <Box>
                <form noValidate autoComplete='off'>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Email'
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.email)}
                                    placeholder='admin@materialize.com'
                                />
                            )}
                        />
                        {errors.email && (
                            <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                            Password
                        </InputLabel>
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <OutlinedInput
                                    value={value}
                                    onBlur={onBlur}
                                    label='Password'
                                    onChange={onChange}
                                    id='auth-login-v2-password'
                                    error={Boolean(errors.password)}
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            )}
                        />
                        {errors.password && (
                            <FormHelperText sx={{ color: "error.main" }} id=''>
                                {errors.password.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}
                    >
                        <FormControlLabel
                            label='Remember Me'
                            control={<Checkbox />}
                            sx={{ "& .MuiFormControlLabel-label": { color: "text.primary" } }}
                        />
                        <Link passHref href='/forgot-password'>
                            <Typography component={MuiLink} variant='body2' sx={{ color: "primary.main" }}>
                                Forgot Password?
                            </Typography>
                        </Link>
                    </Box>
                    <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                        Login
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                        <Typography sx={{ mr: 2, color: "text.secondary" }}>New on our platform?</Typography>
                        <Typography>
                            <Link passHref href='/register'>
                                <Typography component={MuiLink} sx={{ color: "primary.main" }}>
                                    Create an account
                                </Typography>
                            </Link>
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 5, mb: 7.5, "& .MuiDivider-wrapper": { px: 4 } }}>or</Divider>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Link href='/' passHref>
                            <IconButton component='a' onClick={e => e.preventDefault()}>
                                <Facebook sx={{ color: "#497ce2" }} />
                            </IconButton>
                        </Link>
                        <Link href='/' passHref>
                            <IconButton component='a' onClick={e => e.preventDefault()}>
                                <Twitter sx={{ color: "#1da1f2" }} />
                            </IconButton>
                        </Link>
                        <Link href='/' passHref>
                            <IconButton component='a' onClick={e => e.preventDefault()}>
                                <Github
                                    sx={{
                                        color: theme =>
                                            theme.palette.mode === "light" ? "#272727" : theme.palette.grey[300]
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Link href='/' passHref>
                            <IconButton component='a' onClick={e => e.preventDefault()}>
                                <Google sx={{ color: "#db4437" }} />
                            </IconButton>
                        </Link>
                    </Box>
                </form>
            </Box>
        </>
    )
}
