import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';
import { instituitionToken, leaderToken, pupilToken } from './tokens.js';

const leaderRoomId = 2;
let roomId;
describe('roomServices suite case (GET METHOD)', () => {
  it("should return a list containing many rooms when user a employeer or a instituition", async () => {
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
      },
    });
    strictEqual(request.status, 200);
    const response = await request.json();

    deepStrictEqual(true, Array.isArray(response));
  });
  it("should return a list containing only the Leader room when user is a Leader", async () => {
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${leaderToken}`,
      },
    });
    strictEqual(request.status, 200);
    const response = await request.json();

    strictEqual(response.id, leaderRoomId);
  });
  it("should return a error when user do not has role enough", async () => {
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${pupilToken}`,
      },
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual('Invalid permission', response);
  });
});

describe('roomServices suite case (POST METHOD)', () => {
  const body = {
    name: "1° \"A\"",
  };
  it('should return erro when user do not has role enough', async () => {
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual('Invalid permission', response);
  });

  it('should return error when user do not sent a name', async () => {
    const fakeBody = {

    };
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeBody),
    });
    strictEqual(request.status, 400);
    const response = await request.json();
    deepStrictEqual({ error: true, msg: "Missing name" }, response);
  });
  it('should return erro when room already exist', async () => {
    const fakeBody = {
      name: "2° \"B\"",
    };
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeBody),
    });

    strictEqual(request.status, 400);
    const response = await request.json();
    deepStrictEqual({ error: true, msg: "Room already exist" }, response);
  });
  it('should return success', async () => {
    let id;
    const roomsResponse = await fetch('http://127.0.0.1:3001/room/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
      },
    });
    if (roomsResponse.ok) {
      const roomsData = await roomsResponse.json();

      roomsData.forEach((room) => {
        if (room.name === '1° "A"') {
          id = room.id;
        }
      });
    }
    if (id) {
      await fetch(`http://127.0.0.1:3001/room/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${instituitionToken}`,
        },
      });
    }
    const request = await fetch('http://127.0.0.1:3001/room/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await fetch('http://127.0.0.1:3001/room/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
      },
    });
    if (response.ok) {
      const roomsData = await response.json();

      roomsData.forEach((room) => {
        if (room.name === '1° "A"') {
          roomId = room.id;
        }
      });
    }
    strictEqual(request.status, 201);
  });
});

describe('roomServices test case (PUT METHOD)', () => {
  const body = {
    name: "1° \"A\"",
  };
  it('should return erro when user do not has role enough', async () => {
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual('Invalid permission', response);
  });

  it('should return error when user do not sent a name', async () => {
    const fakeBody = {

    };
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeBody),
    });
    strictEqual(request.status, 400);
    const response = await request.json();
    deepStrictEqual({ error: true, msg: "Missing name" }, response);
  });

  it('should return erro when room do not exist', async () => {
    const fakeBody = {
      name: "a fake room",
    };
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId + 8}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeBody),
    });

    strictEqual(request.status, 404);
  });

  it('should return success', async () => {
    const fakeBody = {
      name: "a updated room",
    };
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeBody),
    });

    strictEqual(request.status, 201);
  });
});

describe('roomServices test case (DELETE METHOD)', () => {
  it('should return erro when room do not exist', async () => {
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId + 8}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
    });

    strictEqual(request.status, 404);
  });

  it('should return success', async () => {
    const request = await fetch(`http://127.0.0.1:3001/room/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${instituitionToken}`,
        "Content-Type": "application/json",
      },
    });

    strictEqual(request.status, 201);
  });
});
