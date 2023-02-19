import { FC, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input, Form, Button, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import images from '@assets/images';
import { LogoIcon } from '@components/Icons';
import { registerWithEmailAndPassword } from '@utils/authen';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from '@slices/userSlice';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user } = useAppSelector((state) => state.user);

    const handleRegister = useCallback(
        async (formData: any) => {
            const user = await registerWithEmailAndPassword(formData.email, formData.password, formData.name);
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: formData.name,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                );
                message.success('Create account success!');
            } else {
                message.error('Create account error!');
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
                        <h1 className={cx('heading')}>Tạo tài khoản Sociala</h1>
                        <div className={cx('provider')}>
                            <span className={cx('google')}>
                                <img src={images.googleLogo} alt="" />
                            </span>
                        </div>
                        <p className={cx('description')}>Hoặc đăng ký với email và mật khẩu của bạn:</p>
                        <div className={cx('form')}>
                            <Form name="register" form={form} onFinish={handleRegister} autoComplete="off">
                                <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                                    <Input className={cx('input')} placeholder="Your name" autoComplete="off" />
                                </Form.Item>
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
                                        Create account
                                    </Button>
                                    <Button
                                        type="primary"
                                        ghost
                                        className={cx('create')}
                                        onClick={() => navigate(ROUTE_PATH.SIGN_IN)}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
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

export default RegisterPage;
