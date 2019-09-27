const net = require('net');
const np = require('../lib');
const npt = require('../lib/NamedPipe/NamedPipeTransport');
const protocol = require('../lib');
const  chai  = require('chai');
var expect = chai.expect;

class FauxSock{
    constructor(contentString){
        if(contentString){
            this.contentString = contentString;
            this.position = 0;
        }
        this.connecting = false;
        this.exists = true;
    }

    write(buffer){
        this.buffer = buffer;
    }

    send(buffer){
        return buffer.length;
    };

    receive(readLength){
        if(this.contentString[this.position])
        {
            this.buff = Buffer.from(this.contentString[this.position]);
            this.position++;

            return this.buff.slice(0, readLength);
        }

        if(this.receiver.isConnected)
            this.receiver.disconnect();
    }
    close(){};
    end(){
        this.exists = false;
    };
    destroyed(){
        return this.exists;
    };

    setReceiver(receiver){
        this.receiver = receiver;
    }

    on(action, handler){
        if(action === 'error'){
            this.errorHandler = handler;
        }
        if(action === 'data'){
            this.messageHandler = handler;
        }
        if(action === 'close'){
            this.closeHandler = handler;
        }

    };
}
class TestServer {
    constructor(baseName) {
        let _baseName = undefined;
        let _server = undefined;
        let transport = undefined;

        this._baseName = baseName;
    }

    connect() {
        let pipeName = npt.NamedPipeTransport.PipePath + this._baseName;

        let connectResolve = undefined;

        let result = new Promise((resolve, reject) => {
            connectResolve = resolve;
        });

        this._server = net.createServer(() => {
            this.transport = new npt.NamedPipeTransport(new FauxSock , pipeName);
            connectResolve();
        });
        this._server.listen(pipeName);

        return result;
    }

    disconnect() {
        if (this.transport) {
            this.transport.close();
            this.transport = undefined;
        }

        if (this._server) {
            this._server.close();
            this._server = undefined;
        }
    }
}

class TestClient {


    constructor(baseName) {
        let _baseName = undefined;
        let transport = undefined;

        this._baseName = baseName;
    }

    connect() {
        let pipeName = npt.NamedPipeTransport.PipePath + this._baseName;

        let socket = new FauxSock;
        this.transport = new npt.NamedPipeTransport(socket, '');

        return Promise.resolve();
    }

    disconnect() {
        if (this.transport) {
            this.transport.close();
            this.transport = undefined;
        }
    }
}

function connect(s, c) {
    var p = new Promise((resolve, reject) => {
        var clientConnected = false;
        var serverConnected = false;

        s.connect().then(() => {
            serverConnected = true;
            if (clientConnected && serverConnected) {
                resolve(true);
            }
        });

        c.connect().then(() => {
            clientConnected = true;
            if (clientConnected && serverConnected) {
                resolve(true);
            }
        });
    });

    return p;
}

describe('Streaming Extensions NamedPipe Library Tests', () => {
    describe('NamedPipe Transport Tests', () => {
        it('Client connect', () => {
            let pipeName = 't1';
            let c = new TestClient(pipeName);
            let t = c.connect();
            expect(t).to.not.be.undefined;
            c.disconnect();
        });

        it('Client cannot send while connecting', async (done) => {
            let pipeName = 't1';
            let c = new TestClient(pipeName);
            c.connect();

            var b = Buffer.from('12345', 'utf8');

            let count = c.transport.send(b);

            expect(count).to.equal(0);

            c.disconnect();
            done();
        });

        it('creates a new transport', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket1');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect( () => transport.close()).to.not.throw;
        });

        it('creates a new transport and connects', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket2');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            expect( () => transport.close()).to.not.throw;
        });

        it('closes the transport without throwing', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket3');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect( transport.close()).to.not.throw;
            let exists = transport.isConnected();
            expect(exists).to.be.false;
        });

        it('writes to the socket', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket4');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            let buff = Buffer.from('hello', 'utf8');
            let sent = transport.send(buff);
            expect(sent).to.equal(5);
            expect( () => transport.close()).to.not.throw;
        });

        it('returns 0 when attepmting to write to a closed socket', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket5');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            sock.writable = false;
            let buff = Buffer.from('hello', 'utf8');
            let sent = transport.send(buff);
            expect(sent).to.equal(0);
            expect( () => transport.close()).to.not.throw;
        });

        it('throws when reading from a dead socket', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket5');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            expect(transport.receive(5)).to.throw;
            expect( () => transport.close()).to.not.throw;
        });

        it('can read from the socket', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock);
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            transport.receive(12).catch();
            transport.socketReceive(Buffer.from('Hello World!', 'utf8'));

            expect( () => transport.close()).to.not.throw;
        });


        it('cleans up when onClose is fired', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket6');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            transport.socketClose();
            expect(transport._active).to.be.null;
            expect(transport._activeReceiveResolve).to.be.null;
            expect(transport._activeReceiveReject).to.be.null;
            expect(transport._socket).to.be.null;
            expect(transport._activeOffset).to.equal(0);
            expect(transport._activeReceiveCount).to.equal(0);
        });

        it('cleans up when socketError is fired', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket6');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            transport.socketError();
            expect(transport._active).to.be.null;
            expect(transport._activeReceiveResolve).to.be.null;
            expect(transport._activeReceiveReject).to.be.null;
            expect(transport._socket).to.be.null;
            expect(transport._activeOffset).to.equal(0);
            expect(transport._activeReceiveCount).to.equal(0);
        });

        it('does not throw when socketReceive is fired', () => {
            let sock = new FauxSock();
            sock.destroyed = false;
            sock.connecting = false;
            sock.writable = true;
            let transport = new npt.NamedPipeTransport(sock, 'fakeSocket6');
            expect(transport).to.be.instanceOf(npt.NamedPipeTransport);
            expect(transport.isConnected()).to.be.true;
            let buff = Buffer.from('hello', 'utf8');
            expect(transport.socketReceive(buff)).to.not.throw;
        });
    });

    describe('NamedPipe Client Tests', () => {
        it('creates a new client', () => {
            let client = new np.NamedPipeClient('pipeA', new protocol.RequestHandler(), false);
            expect(client).to.be.instanceOf(np.NamedPipeClient);
            expect(client.disconnect()).to.not.throw;
        });

        it('connects without throwing', () => {
            let client = new np.NamedPipeClient('pipeA', new protocol.RequestHandler(), false);
            expect(client.connect()).to.not.throw;
            expect(client.disconnect()).to.not.throw;
        });

        it('disconnects without throwing', () => {
            let client = new np.NamedPipeClient('pipeA', new protocol.RequestHandler(), false);
            expect(client.disconnect()).to.not.throw;
        });

        it('sends without throwing', (done) => {
            let client = new np.NamedPipeClient('pipeA', new protocol.RequestHandler(), false);
            let req = new protocol.StreamingRequest();
            req.Verb = 'POST';
            req.Path = 'some/path';
            req.setBody('Hello World!');
            client.send(req).catch(err => {expect(err).to.be.undefined;}).then(done());
        });

    });

    describe('NamedPipe Server Tests', () => {

        it('creates a new server', () => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), false);
            expect(server).to.be.instanceOf(np.NamedPipeServer);
            expect(server.disconnect()).to.not.throw;
        });

        it('starts the server without throwing', () => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), false);
            expect(server).to.be.instanceOf(np.NamedPipeServer);

            expect(server.start()).to.not.throw;
            expect(server.disconnect()).to.not.throw;
        });

        it('disconnects without throwing', () => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), false);
            expect(server).to.be.instanceOf(np.NamedPipeServer);
            expect(server.start()).to.not.throw;
            expect(server.disconnect()).to.not.throw;
        });


        it('sends without throwing', (done) => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), false);
            expect(server).to.be.instanceOf(np.NamedPipeServer);
            expect(server.start()).to.not.throw;
            let req = {verb: 'POST', path: '/api/messages', streams: []};
            server.send(req).catch(err => {expect(err).to.be.undefined;}).then(
            expect(server.disconnect()).to.not.throw).then(done());
        });

        it('handles being disconnected', (done) => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), false);
            expect(server).to.be.instanceOf(np.NamedPipeServer);
            server.start();
            try {
                server.onConnectionDisconnected();
            } catch (error) {
                expect(err).to.equal(`address already in use \\.\pipe\pipeA.incoming`);
            }
            expect(server.disconnect()).to.not.throw;
            done();
        });

        it('handles being disconnected and tries to reconnect', (done) => {
            let server = new np.NamedPipeServer('pipeA', new protocol.RequestHandler(), true);
            expect(server).to.be.instanceOf(np.NamedPipeServer);
            server.start();
            try {
                server.onConnectionDisconnected();
            } catch (err) {
                expect(err).to.equal(`address already in use \\.\pipe\pipeA.incoming`);
            }
            expect(server.disconnect()).to.not.throw;
            done();
        });
    });
});
