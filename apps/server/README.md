# kurakichi/server

Express と ApolloServer(GraphQL)によって構成された、ApplicationServer です。

DDD のエッセンスを導入しております。

開発した感想ですが、DDD を利用するならば、CQRS の導入が必須だと強く感じられました。

また、RDBMS を利用する必要性も感じません。DDD と GraphQL を利用するならば

NoSQL や EvnetDB を利用する方が、開発する上でも、Transaction の面からも良いのではないかという実感があります。
