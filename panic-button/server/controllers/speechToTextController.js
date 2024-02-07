const fs = require('fs');
const OpenAI = require('openai').default;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function sendToWisper(recordFile) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(recordFile.path),
      model: 'whisper-1'
    });

    fs.unlinkSync(recordFile.path);

    return transcription.text;
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function isKeyWordInStr(KeyWord, str) {
  // Remove non-letter characters from both word and sentence
  const cleanWord = KeyWord.replace(/[^a-zA-Z\u0590-\u05FF]/g, '');
  const cleanSentence = str.replace(/[^a-zA-Z\u0590-\u05FF ]/g, '');
 
  // Split the clean sentence into an array of words
  const words = cleanSentence.toLowerCase().split(' ');
 
  // Check if the clean word exists in the array of words
  return words.includes(cleanWord.toLowerCase());
}

async function isWordInRecord(recordFile, keyWord){
  try{
    transcription = await sendToWisper(recordFile);
  }catch(error){
    console.error('Error:', error);
    throw error;
  }
  const isKeyWordInTranscription = isKeyWordInStr(keyWord, transcription);
  return {isKeyWordInTranscription, transcription};
}

module.exports = {
  isWordInRecord
};