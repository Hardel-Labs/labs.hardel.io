import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import CodeBlock from '@components/codeblock/CodeBlock';

export default async function AuthPage() {
    const session = await unstable_getServerSession(authOptions);

    return (
        <div className={'min-height-view px-[200px] mb-10'}>
            <CodeBlock title={'Session.json'} language={'json'}>
                {JSON.stringify(session, null, 4)}
            </CodeBlock>
        </div>
    );
}
