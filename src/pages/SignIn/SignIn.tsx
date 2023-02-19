import { FC, useCallback } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, Form, Button, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import images from '@assets/images';
import { LogoIcon } from '@components/Icons';
import { signInWithGoogle, logInWithEmailAndPassword } from '@utils/authen';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from '@slices/userSlice';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const SignInPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user } = useAppSelector((state) => state.user);

    const handleLoginWithGoogle = useCallback(async () => {
        const user = await signInWithGoogle();
        if (user) {
            dispatch(
                setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }),
            );
            message.success('Login success!');
        } else {
            message.error('Login failure! Please, again!');
        }
    }, [dispatch]);

    const handleLogin = useCallback(
        async (formData: any) => {
            const user = await logInWithEmailAndPassword(formData.email, formData.password);
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                );
                message.success('Login success!');
            } else {
                message.error('Login failure! Please, again!');
            }
        },
        [dispatch],
    );

    return (
        <>
            {user ? (
                <Navigate to={ROUTE_PATH.HOME} />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <h3 className={cx('logo')}>
                            <LogoIcon width="3.2rem" height="3.2rem" className={cx('logo-icon')} />
                            Sociala
                        </h3>
                        <h1 className={cx('heading')}>Đăng nhập vào Sociala</h1>
                        <div className={cx('provider')}>
                            <span className={cx('google')} onClick={handleLoginWithGoogle}>
                                <img src={images.googleLogo} alt="" />
                            </span>
                        </div>
                        <p className={cx('description')}>Hoặc đăng nhập với email và mật khẩu của bạn:</p>
                        <div className={cx('form')}>
                            <Form name="login" form={form} onFinish={handleLogin} autoComplete="off">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Invalid email format!' },
                                    ]}
                                >
                                    <Input className={cx('input')} placeholder="Your email" autoComplete="off" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 6,
                                            message: 'Password minimum 6 characters!',
                                        },
                                    ]}
                                >
                                    <Input.Password className={cx('input')} placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className={cx('login')}>
                                        Login
                                    </Button>
                                    <Button
                                        type="primary"
                                        ghost
                                        className={cx('create')}
                                        onClick={() => navigate(ROUTE_PATH.REGISTER)}
                                    >
                                        Create account
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <p className={cx('forgot-pw')}>
                            <Link to="/">Quên mật khẩu?</Link>
                        </p>
                        <p className={cx('terms')}>
                            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                            <span className={cx('highlight')}> Điều khoản sử dụng</span> của chúng tôi.
                        </p>
                    </div>
                    <div className={cx('background')} style={{ backgroundImage: `url('${images.bgLogin}')` }}></div>
                </div>
            )}
        </>
    );
};

export default SignInPage;
