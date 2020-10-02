
## Docker File Creation

dotnet publish -c release -o app/ .
docker build --pull -t grocerystore_backend .


docker run -p 8181:80 grocerystore_backend


docker tag grocerystore_backend registry.heroku.com/eorganicshop/web

heroku container:push web -a eorganicshop

heroku container:release web -a eorganicshop
**********

docker push registry.heroku.com/eorganicshop/web


heroku container:release web -a eorganicshop
**********

https://eorganicshop.herokuapp.com/


https://ecommorganic.herokuapp.com