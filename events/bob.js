module.exports = (client, message, reply = false) => {

    if (message.channel.type === 'dm') {
        message.channel.send('Trivia question..');
        //handle questions


    } else {
        //Check when last answered
        message.channel.send(`Hey, ${message.username} !  vSide Trivia time.  I'll start and give you a question and you whisper back the answer.`)
    }
}