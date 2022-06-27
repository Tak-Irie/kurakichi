# kurakichi_web

Next.js と ApolloClient(GraphQL)を利用した GUI です。

hooks 以前からコードを継ぎ足しており、フォルダ構成にアトミックデザインを採用しております。

運用してみた感想ですが、hooks 以後であれば、アトミックデザインを無理に使用することはないかなと感じます。

再利用性が高くなく、コンポーネントの粒度設計に難しさがあります。tailwind の相性も良くないです。

bulletproof-react のような分割の方が、良いと感じています。
