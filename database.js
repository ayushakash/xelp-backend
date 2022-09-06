const mongoose = require("mongoose");

mongoose
    .connect(
        'mongodb+srv://chardeevari:chardeevari%40mongo@cluster0.rfwfs.mongodb.net/?retr' +
                'yWrites=true&w=majority',

        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('mongo connected sucessfuly'))
    .catch((err) => console.log(err))

const CheckoutSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true,
      }, 
      email: {
          type: String,
          required: true,
        },
      phone: {
        type: Number,
        default: 0,
      }, 
      password: {
          type: String,
          required: true,
        }

});

const customerData = mongoose.model("xelp_data", CheckoutSchema);

module.exports = customerData;
