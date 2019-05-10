![Event Driven Architecture](https://raw.githubusercontent.com/adopabianko/event-driven-architecture/master/Simple%20Event-Driven%20Architecture.png)


- git clone https://github.com/adopabianko/event-driven-architecture.git
- cd event-driven-architecture
- cd rabbitmq
- docker-compose up -d
- cd ../
- cd register
- npm install
- docker-compose up -d
- cd ../
- cd wirehouse
- npm install
- Create manual db wirehouse
- docker exec -it wirehouse_app /bin/bash
- node_modules/.bin/sequelize db:migrate
- curl -X POST \
  http://localhost:9191/auth/register \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
        "name":"Ado Pabianko",
        "email":"adopabianko@gmail.com",
        "handphone":"081283781369",
        "gender":1,
        "password":"admin123",
        "password_repeat":"admin123"
  }'
