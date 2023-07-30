import { NearBindgen, near, call, view } from 'near-sdk-js';


class Message {
  content: string;
  owner_id: string;

  constructor(content: string, owner_id: string){
    this.content = content;
    this.owner_id = owner_id; 
  }
}

@NearBindgen({})
class DevTalk {

  messages: Message[];//stores all messages sent to the contract

  constructor() {
    this.messages = [];
  }

  @call({})
  add_message({message}: {message:string}): void {

    let messageObject = new Message( 
      message,                      //content
      near.predecessorAccountId()   // to get ownerID 
      );

    this.messages.push(messageObject); //takes in new message and pushes it to all of our messages 
  }

  @view({})
  get_latest_messages ({}){

    let numberOfMessages = Math.min(15, this.messages.length); // gets 15 latest messages 
    let result =[]; 
    const startIndex = this.messages.length - numberOfMessages;


    for (var index = 0; index< numberOfMessages; index++){
      result[index] = this.messages[index + startIndex];

    }

    return result;
  }


  @view({})
  get_total_messages({}) : number {
    return this.messages.length;    // getting length of an array , data type to be returned is number
  }
}