Todos = new Mongo.Collection('todos');

//Todos.find({ name: "Sajil" }).fetch();
//Todos.find().count();

if (Meteor.isClient) {
    // client code goes here

    Template.todos.helpers({
        'todo': function() {
            // return Todos.find();
            return Todos.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        }
    });

    Template.login.rendered = function() {
        // alert('I MMMMMMMMMMMMMM');
        console.log('login template ready event called');
        $("#regForm").removeClass('hidden').addClass('show');
        $("#logForm").removeClass('hidden').addClass('show');
    };

    Template.todos.events({
        /// events go here

        'click .delete-todo': function(event) {
            event.preventDefault();
            var documentId = this._id;
            var confirm = window.confirm("Delete this task?");
            if (confirm) {
                Todos.remove({
                    _id: documentId
                });
            }
        },

        'click .logout': function(event) {
            event.preventDefault();
            Meteor.logout();
        },

        'click #view3Btt': function(event) {
            //alert('i am called');
            Router.go('/view3')
        },

        'click #view4Btt': function(event) {
            Router.go('/view4')
        },

        'click #addButton': function(event) {
            // alert('i am callled');
            Todos.insert({
                name: "P K SAJIL",
                score: 30
            });

        },

        'keyup [name=todoItem]': function(event) {
            var documentId = this._id;
            var todoItem = $(event.target).val();
            Todos.update({
                _id: documentId
            }, {
                $set: {
                    name: todoItem
                }
            });
            console.log("Task changed to: " + todoItem);
        },

        'submit form': function(event) {
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            Todos.insert({
                name: todoName,
                completed: false,
                createdAt: new Date()
            });
            $('[name="todoName"]').val('');
        }
    });

    Template.todos.events({
        'click .logout': function(event) {
            event.preventDefault();
            Meteor.logout();
        }
    });

    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            alert('email ' + emailVar);
            alert('pass ' + passwordVar);

            Accounts.createUser({
                email: emailVar,
                password: passwordVar
            });
            console.log("Form submitted.");
        }
    });

    Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.loginEmail.value;
            var passwordVar = event.target.loginPassword.value;

            Meteor.loginWithPassword(emailVar, passwordVar);
            console.log("Form submitted.");
        }
    });

}

if (Meteor.isServer) {
    Houston.add_collection(Meteor.users); 
    // server code goes here
    //  Accounts.validateNewUser(function(user) {
    //   var user_email = user.emails[0].address;
    //   var _usr = user.email
    //  comsole.log('sajil    '+_usr);
    // var existing_user = Meteor.users.findOne({ 'services.facebook.email' : user_email});
    // if(existing_user) throw new Meteor.Error(500, "A user already exists with facebook id " + existing_user.services.facebook.id);
    // });

}

/*Accounts.onLogin(function() {
 // console.log(Meteor.userId());
})

Accounts.onLoginFailure(function() {
  console.log("failed");
  // var confirm = window.confirm("LOgin error");
})*/