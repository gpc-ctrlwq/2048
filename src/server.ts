import { IncomingMessage, ServerResponse, createServer } from 'http';
import { readFile } from 'fs';
import { extname } from 'path';

const server = createServer(dispatch);

server.listen(4040, 'localhost', () => {
    console.log('Server listening');
});

function dispatch(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const basePath = './build';
    let filePath = basePath + req.url;

    // set corrent content type
    let contentType = '';
    const ext = extname(filePath);
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.map':
            contentType = 'application/json';
            break;
        case '.ts':
            contentType = 'application/typescript';
            filePath = './src' + req.url;
            break;
        default:
            console.log('content type missing for: ' + req.url);
            break;
    }

    // default response
    if (filePath == basePath + '/') {
        filePath += 'index.html';
        contentType = 'text/html';
    }

    // Write response
    readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(err.message);
        }
        else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(content, 'utf-8');
        }
    });
}
