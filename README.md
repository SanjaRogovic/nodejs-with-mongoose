# nodejs-with-mongoose
NodeJS + Express +  MongoDB

Exercise 1
- Create a folder named express_with_mongodb, navigate with your terminal in this folder and install mongoose with npm install mongoose.
- Create a NodeJS Express server that listens on port 3000
- Create a connection to a database test on MongoDB Atlas.
- help:
  https://mongoosejs.com/
  https://www.mongodb.com/atlas/database

  Exercise 2
- Create a mongoose schema student to save a student with : 
    name (string)
    first_name (string)
    email (string)

Then export the model from this schema - https://mongoosejs.com/docs/models.html
-help:
https://mongoosejs.com/docs/schematypes.html

Exercise 3
- If the user sends a POST request, create a database document with:
    name: “John”
    first_name: “Doe”
    email: “john@doe.com“
-help:
https://mongoosejs.com/docs/schematypes.html

Exercise 4
- Using the code from the previous exercise, when the user sends a GET query, return a JSON of all DB entries.
- help:
https://mongoosejs.com/docs/api/query.html#Query.prototype.find()

Exercise 5 
- Using the code from the previous exercise, if the user sends a PUT query, modify all the entries with the name equal to John, change it to “Bob”.
- Check by making a GET query.
- help:
https://mongoosejs.com/docs/documents.html#updating




