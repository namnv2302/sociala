import { FC } from 'react';
import { Result } from 'antd';

const NotFoundPage: FC = () => {
    return (
        <Result
            style={{ marginTop: '100px' }}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        />
    );
};

export default NotFoundPage;
