import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ChatPage = ({ bountyId, userId }) => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token', 'userPriv_Token']);

    useEffect(() => {
        fetch(`http://localhost:8080/bounties/${bountyId}/messages`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error("There was an error fetching chat messages:", error));
    }, [bountyId]);

    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = { userId, text: input.trim() };
            fetch(`http://localhost:8080/bounties/${bountyId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Failed to send message');
                })
                .then(message => {
                    setMessages([...messages, message]);
                    setInput('');
                })
                .catch(error => console.error("There was an error sending the message:", error));
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', margin: 'auto', maxWidth: '600px', mt: 2 }}>
            <Box sx={{ mb: 2, p: 2 }}>
                <Typography variant="h5">Bounty Details</Typography>
                <Link to="/bounties">Back to Bounties</Link>
            </Box>
            <Paper sx={{ flex: 1, overflowY: 'auto', p: 2, mb: 2 }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>{message.user_id === userId ? 'Y' : 'O'}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${message.user_id === userId ? 'You' : 'Other'} - ${new Date(message.created_at).toLocaleTimeString()}`}
                                secondary={message.post_text}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box sx={{ display: 'flex', p: 2, borderTop: '1px solid #ddd', backgroundColor: '#fafafa' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    sx={{ flexGrow: 1, mr: 2 }}
                />
                <Button variant="contained" onClick={handleSend} sx={{ backgroundColor: 'purple', color: 'white', '&:hover': { backgroundColor: 'darkviolet' } }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatPage;