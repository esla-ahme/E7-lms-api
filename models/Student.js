const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})
StudentSchema.plugin(AutoIncrement, { inc_field: 'id' });


module.exports = mongoose.model('Students', StudentSchema)