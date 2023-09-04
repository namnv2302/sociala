import { Suspense, Fragment, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { v4 } from 'uuid';
import { publicRoutes } from '@constants/routers';
import DefaultLayout from '@layouts/DefaultLayout';
import { auth } from 'store/firebase';
import { useAppDispatch } from 'redux/hooks';
import { setUser } from '@slices/userSlice';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                );
            } else {
                dispatch(setUser(null));
            }
        });

        return () => unsub();
    }, [dispatch, navigate]);

    return (
        <div className="App">
            <Suspense fallback={<div>Loading</div>}>
                <Routes>
                    {publicRoutes?.map((route) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={v4()}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
