import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';

const ChatPage = ({ userId }) => {
    const { bountyId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token'])


    useEffect(() => {
        fetch(`http://localhost:8080/bounties/${bountyId}/messages`)
            .then(response => response.json())
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error("There was an error fetching chat messages:", error);
            });
    }, [bountyId]);

    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = {
                userId,
                text: input.trim()
            };
            // user_id: sessionCookies.user_id_token,
            // project_id: bountyId,
            // post_text: input.trim()
            // };
            fetch(`http://localhost:8080/bounties/${bountyId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to send message');
                })
                .then(message => {
                    setMessages([...messages, message]);
                    setInput('');
                })
                .catch(error => {
                    console.error("There was an error sending the message:", error);
                });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <Paper style={{ flex: 1, overflowY: 'auto' }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={message.user_id === userId ? 'You' : 'Other'} secondary={message.post_text} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <div style={{ display: 'flex', padding: '1em', borderTop: '1px solid #ddd' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button variant="contained" color="primary" onClick={handleSend} style={{ marginLeft: '1em' }}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatPage;
