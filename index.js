const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testes',{ useNewUrlParser: true });
mongoose.Promise = global.Promise; // → Queremos que o mongoose utilize promises ES6
mongoose.connection.on('error', err => {
    console.log(`🙅 🚫 → ${err.message}`);
});
require('models/Person');
require('models/Story');
const Person = mongoose.model('Person');
const Story = mongoose.model('Story');
const querySave = async () =>{
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
    });
    const authorSave = await author.save();
    var story1 = new Story({
        title: 'Casino Royale',
        author: authorSave._id   // assign the _id from the person
    });
    const saveStory = await story1.save();
    console.log(saveStory)
}
const queryFind = async () =>{
    const findStory = await Story.findOne({title: 'Casino Royale'}).populate('author').exec();
    console.log(findStory);
}
queryFind();