import React from 'react';
import styled from 'styled-components';
import SocketIO from 'socket.io-client';

const AppStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
  flex-basis: 90%;
`;

const Message = styled.p``;

const Wrapper = styled.div`
  flex-basis: 10%;
  display: flex;
`;

const Input = styled.input`
  flex-basis: 80%;
`;

const Button = styled.button`
  flex-basis: 20%;
`;

const socket = SocketIO('http://localhost:8080');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
      messages: [{
        id: 0,
        message: 'Some message #1'
      },
      {
        id: 1,
        message: 'Some message #2'
      }]
    };
  }

  componentDidMount() {
    socket.on('push-new-message', message => {
      this.setState((state) => {
        return {
          messages: [...state.messages, {
            id: Math.random(),
            message: message
          }],
        }
      });
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    socket.emit('new-message', this.state.currentInput);
    this.setState((state) => {
      return {
        messages: [...state.messages, {
          id: Math.random(),
          message: state.currentInput
        }],
        currentInput: ''
      }
    });
  }

  changeInput = (event) => {
    this.setState({
      currentInput: event.target.value
    });
  }

  render() {
    const history = this.state.messages.map(mes => <Message key={mes.id}>{mes.message}</Message>);
    return (
      <AppStyled>
        <Chat>
          { history }
        </Chat>
        <Wrapper>
          <Input value={this.state.currentInput} onChange={this.changeInput}></Input>
          <Button onClick={this.handleClick}>Send</Button>
        </Wrapper>
      </AppStyled>
    );
  }
}

export default App;
