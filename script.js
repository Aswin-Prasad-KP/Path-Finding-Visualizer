document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';

    document.querySelector('.container').appendChild(canvas);
    
	const CANVAS_WIDTH = document.getElementById('map').clientWidth;
	const CANVAS_HEIGHT = document.getElementById('map').clientHeight;

	class DijkstraAlgorithm {
		constructor() {
			this.V = 49;
		}

		minDistance(dist, sptSet) {
			let min = Number.MAX_VALUE;
			let min_index = -1;

			for (let v = 0; v < this.V; v++) {
				if (!sptSet[v] && dist[v] <= min) {
					min = dist[v];
					min_index = v;
				}
			}

			return min_index;
		}

		dijkstra(graph, src, dest) {
			this.V = graph.length;
			let dist = new Array(this.V).fill(Number.MAX_VALUE);
			let pred = new Array(this.V).fill(-1);
			let sptSet = new Array(this.V).fill(false);

			dist[src] = 0;
			pred[src] = -1;

			for (let count = 0; count < this.V - 1; count++) {
				let u = this.minDistance(dist, sptSet);

				if (u === dest)
					break;

				sptSet[u] = true;

				for (let v = 0; v < this.V; v++) {
					if (!sptSet[v] && graph[u][v] !== 0 && dist[u] !== Number.MAX_VALUE &&
						dist[u] + graph[u][v] < dist[v]) {
						dist[v] = dist[u] + graph[u][v];
						pred[v] = u;
					}
				}
			}

			console.log("\nEstimated time to reach: " + (dist[dest] / 100) * 0.6 + " mins");
			return this.printPath(pred, src, dest);
		}

		printPath(pred, src, dest) {
			let path = [];
			let current = dest;
			while (current !== src) {
				path.unshift(current);
				current = pred[current];
			}
			path.unshift(src);
			return path;
		}
	}

	class Node {
		constructor(x, y, index) {
			this.x = x;
			this.y = y;
			this.index = index;
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();

			ctx.font = "bold 12px Arial";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText(this.index.toString(), this.x, this.y - 10);
		}
	}

	class Edge {
		constructor(startNode, endNode) {
			this.startNode = startNode;
			this.endNode = endNode;
			this.weight = this.distance(startNode, endNode);
			Edge.weights[startNode.index][endNode.index] = this.weight;
			this.drawColor = 'blue';
		}

		distance(node1, node2) {
			return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.startNode.x, this.startNode.y);
			ctx.lineTo(this.endNode.x, this.endNode.y);
			ctx.strokeStyle = this.drawColor;
			ctx.lineWidth = 1;
			ctx.stroke();
		}
	}

	Edge.weights = new Array(49).fill().map(() => new Array(49).fill(0)); // Initialize with zeros

	class NodeConnector {
		constructor() {
			this.shortestPath = [];
			this.nodes = [];
			this.edges = [];
			this.canvas = canvas;
			this.canvas.width = CANVAS_WIDTH;
			this.canvas.height = CANVAS_HEIGHT;
			this.ctx = this.canvas.getContext('2d');
		}

		addNode(x, y) {
			x = x - (x / 100) * 30 + 10;
			y = y - (y / 100) * 30 + 10;
			this.nodes.push(new Node(x, y, this.nodes.length));
			this.repaint();
		}

		addEdge(startNode, endNode) {
			this.edges.push(new Edge(startNode, endNode));
			this.edges.push(new Edge(endNode, startNode));
			this.repaint();
		}

		setShortestPath(path) {
			this.shortestPath = path;
			this.repaint();
		}

		repaint() {
			this.paint();
		}

		paint() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			for (let node of this.nodes) {
				node.draw(this.ctx);
			}

			for (let edge of this.edges) {
				edge.draw(this.ctx);
			}

			this.ctx.strokeStyle = 'red';
			this.ctx.lineWidth = 3;
			for (let i = 0; i < this.shortestPath.length - 1; i++) {
				let startNode = this.nodes[this.shortestPath[i]];
				let endNode = this.nodes[this.shortestPath[i + 1]];
				this.ctx.beginPath();
				this.ctx.moveTo(startNode.x, startNode.y);
				this.ctx.lineTo(endNode.x, endNode.y);
				this.ctx.stroke();
			}
		}
	}

	const nodeConnector = new NodeConnector();

	nodeConnector.addNode(100, 45);
	nodeConnector.addNode(400, 48);
	nodeConnector.addNode(580, 48);
	nodeConnector.addNode(950, 63);
	nodeConnector.addNode(1320, 83);
	nodeConnector.addNode(1325, 213);
	nodeConnector.addNode(1320, 453);
	nodeConnector.addNode(1325, 553);
	nodeConnector.addNode(90, 255);
	nodeConnector.addNode(85, 455);
	nodeConnector.addNode(950, 203);
	nodeConnector.addNode(950, 293);
	nodeConnector.addNode(1010, 283);
	nodeConnector.addNode(910, 275);
	nodeConnector.addNode(1230, 285);
	nodeConnector.addNode(1235, 215);
	nodeConnector.addNode(730, 193);
	nodeConnector.addNode(670, 253);
	nodeConnector.addNode(570, 243);
	nodeConnector.addNode(520, 263);
	nodeConnector.addNode(1070, 283);
	nodeConnector.addNode(910, 385);
	nodeConnector.addNode(600, 353);
	nodeConnector.addNode(370, 353);
	nodeConnector.addNode(700, 435);
	nodeConnector.addNode(400, 178);
	nodeConnector.addNode(265, 245);
	nodeConnector.addNode(260, 353);
	nodeConnector.addNode(260, 300);
	nodeConnector.addNode(260, 450);
	nodeConnector.addNode(220, 450);
	nodeConnector.addNode(550, 454);
	nodeConnector.addNode(1285, 483);
	nodeConnector.addNode(990, 483);
	nodeConnector.addNode(900, 483);
	nodeConnector.addNode(1430, 433);
	nodeConnector.addNode(1425, 538);
	nodeConnector.addNode(1450, 608);
	nodeConnector.addNode(1210, 558);
	nodeConnector.addNode(900, 543);
	nodeConnector.addNode(672, 193);
	nodeConnector.addNode(520, 185);
	nodeConnector.addNode(1523, 213);
	nodeConnector.addNode(1555, 323);
	nodeConnector.addNode(1625, 323);
	nodeConnector.addNode(1625, 233);
	nodeConnector.addNode(1425, 303);
	nodeConnector.addNode(1425, 213);
	
	nodeConnector.addEdge(nodeConnector.nodes[0], nodeConnector.nodes[1]);
	nodeConnector.addEdge(nodeConnector.nodes[1], nodeConnector.nodes[2]);
	nodeConnector.addEdge(nodeConnector.nodes[2], nodeConnector.nodes[3]);
	nodeConnector.addEdge(nodeConnector.nodes[3], nodeConnector.nodes[4]);
	nodeConnector.addEdge(nodeConnector.nodes[4], nodeConnector.nodes[5]);
	nodeConnector.addEdge(nodeConnector.nodes[5], nodeConnector.nodes[6]);
	nodeConnector.addEdge(nodeConnector.nodes[6], nodeConnector.nodes[7]);
	nodeConnector.addEdge(nodeConnector.nodes[0], nodeConnector.nodes[8]);
	nodeConnector.addEdge(nodeConnector.nodes[8], nodeConnector.nodes[9]);
	nodeConnector.addEdge(nodeConnector.nodes[3], nodeConnector.nodes[10]);
	nodeConnector.addEdge(nodeConnector.nodes[10], nodeConnector.nodes[11]);
	nodeConnector.addEdge(nodeConnector.nodes[11], nodeConnector.nodes[12]);
	nodeConnector.addEdge(nodeConnector.nodes[11], nodeConnector.nodes[13]);
	nodeConnector.addEdge(nodeConnector.nodes[10], nodeConnector.nodes[16]);
	nodeConnector.addEdge(nodeConnector.nodes[13], nodeConnector.nodes[17]);
	nodeConnector.addEdge(nodeConnector.nodes[17], nodeConnector.nodes[18]);
	nodeConnector.addEdge(nodeConnector.nodes[17], nodeConnector.nodes[18]);
	nodeConnector.addEdge(nodeConnector.nodes[2], nodeConnector.nodes[18]);
	nodeConnector.addEdge(nodeConnector.nodes[18], nodeConnector.nodes[19]);
	nodeConnector.addEdge(nodeConnector.nodes[14], nodeConnector.nodes[15]);
	nodeConnector.addEdge(nodeConnector.nodes[10], nodeConnector.nodes[15]);
	nodeConnector.addEdge(nodeConnector.nodes[20], nodeConnector.nodes[14]);
	nodeConnector.addEdge(nodeConnector.nodes[12], nodeConnector.nodes[20]);
	nodeConnector.addEdge(nodeConnector.nodes[13], nodeConnector.nodes[21]);
	nodeConnector.addEdge(nodeConnector.nodes[21], nodeConnector.nodes[22]);
	nodeConnector.addEdge(nodeConnector.nodes[22], nodeConnector.nodes[23]);
	nodeConnector.addEdge(nodeConnector.nodes[21], nodeConnector.nodes[24]);
	nodeConnector.addEdge(nodeConnector.nodes[22], nodeConnector.nodes[24]);
	nodeConnector.addEdge(nodeConnector.nodes[1], nodeConnector.nodes[25]);
	nodeConnector.addEdge(nodeConnector.nodes[8], nodeConnector.nodes[26]);
	nodeConnector.addEdge(nodeConnector.nodes[12], nodeConnector.nodes[33]);
	nodeConnector.addEdge(nodeConnector.nodes[32], nodeConnector.nodes[33]);
	nodeConnector.addEdge(nodeConnector.nodes[33], nodeConnector.nodes[34]);
	nodeConnector.addEdge(nodeConnector.nodes[21], nodeConnector.nodes[34]);
	nodeConnector.addEdge(nodeConnector.nodes[6], nodeConnector.nodes[35]);
	nodeConnector.addEdge(nodeConnector.nodes[6], nodeConnector.nodes[32]);
	nodeConnector.addEdge(nodeConnector.nodes[7], nodeConnector.nodes[32]);
	nodeConnector.addEdge(nodeConnector.nodes[22], nodeConnector.nodes[31]);
	nodeConnector.addEdge(nodeConnector.nodes[31], nodeConnector.nodes[29]);
	nodeConnector.addEdge(nodeConnector.nodes[29], nodeConnector.nodes[30]);
	nodeConnector.addEdge(nodeConnector.nodes[9], nodeConnector.nodes[30]);
	nodeConnector.addEdge(nodeConnector.nodes[26], nodeConnector.nodes[28]);
	nodeConnector.addEdge(nodeConnector.nodes[27], nodeConnector.nodes[29]);
	nodeConnector.addEdge(nodeConnector.nodes[19], nodeConnector.nodes[23]);
	nodeConnector.addEdge(nodeConnector.nodes[35], nodeConnector.nodes[36]);
	nodeConnector.addEdge(nodeConnector.nodes[36], nodeConnector.nodes[37]);
	nodeConnector.addEdge(nodeConnector.nodes[36], nodeConnector.nodes[7]);
	nodeConnector.addEdge(nodeConnector.nodes[37], nodeConnector.nodes[7]);
	nodeConnector.addEdge(nodeConnector.nodes[5], nodeConnector.nodes[35]);
	nodeConnector.addEdge(nodeConnector.nodes[7], nodeConnector.nodes[38]);
	nodeConnector.addEdge(nodeConnector.nodes[39], nodeConnector.nodes[38]);
	nodeConnector.addEdge(nodeConnector.nodes[34], nodeConnector.nodes[39]);
	nodeConnector.addEdge(nodeConnector.nodes[16], nodeConnector.nodes[40]);
	nodeConnector.addEdge(nodeConnector.nodes[40], nodeConnector.nodes[17]);
	nodeConnector.addEdge(nodeConnector.nodes[25], nodeConnector.nodes[41]);
	nodeConnector.addEdge(nodeConnector.nodes[18], nodeConnector.nodes[41]);
	nodeConnector.addEdge(nodeConnector.nodes[19], nodeConnector.nodes[41]);
	nodeConnector.addEdge(nodeConnector.nodes[4], nodeConnector.nodes[42]);
	nodeConnector.addEdge(nodeConnector.nodes[42], nodeConnector.nodes[45]);
	nodeConnector.addEdge(nodeConnector.nodes[44], nodeConnector.nodes[45]);
	nodeConnector.addEdge(nodeConnector.nodes[44], nodeConnector.nodes[43]);
	nodeConnector.addEdge(nodeConnector.nodes[5], nodeConnector.nodes[46]);
	nodeConnector.addEdge(nodeConnector.nodes[43], nodeConnector.nodes[46]);
	nodeConnector.addEdge(nodeConnector.nodes[35], nodeConnector.nodes[46]);
	nodeConnector.addEdge(nodeConnector.nodes[35], nodeConnector.nodes[46]);
	nodeConnector.addEdge(nodeConnector.nodes[47], nodeConnector.nodes[46]);
	nodeConnector.addEdge(nodeConnector.nodes[47], nodeConnector.nodes[42]);
	nodeConnector.addEdge(nodeConnector.nodes[15], nodeConnector.nodes[4]);
	nodeConnector.addEdge(nodeConnector.nodes[15], nodeConnector.nodes[5]);
	nodeConnector.addEdge(nodeConnector.nodes[14], nodeConnector.nodes[5]);
	nodeConnector.addEdge(nodeConnector.nodes[47], nodeConnector.nodes[5]);
	nodeConnector.addEdge(nodeConnector.nodes[14], nodeConnector.nodes[6]);
	nodeConnector.addEdge(nodeConnector.nodes[14], nodeConnector.nodes[35]);
	nodeConnector.addEdge(nodeConnector.nodes[19], nodeConnector.nodes[22]);
	nodeConnector.addEdge(nodeConnector.nodes[18], nodeConnector.nodes[22]);
	nodeConnector.addEdge(nodeConnector.nodes[17], nodeConnector.nodes[22]);
	nodeConnector.addEdge(nodeConnector.nodes[17], nodeConnector.nodes[21]);
	nodeConnector.addEdge(nodeConnector.nodes[13], nodeConnector.nodes[22]);
	nodeConnector.addEdge(nodeConnector.nodes[31], nodeConnector.nodes[23]);
	nodeConnector.addEdge(nodeConnector.nodes[20], nodeConnector.nodes[6]);
	nodeConnector.addEdge(nodeConnector.nodes[20], nodeConnector.nodes[35]);
	nodeConnector.addEdge(nodeConnector.nodes[20], nodeConnector.nodes[32]);
	nodeConnector.addEdge(nodeConnector.nodes[31], nodeConnector.nodes[34]);
	nodeConnector.addEdge(nodeConnector.nodes[31], nodeConnector.nodes[39]);

	document.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			let src = parseInt(prompt("Enter the source:"));
			let dest = parseInt(prompt("Enter the destination:"));

			let t = new DijkstraAlgorithm();
			let shortestPath = t.dijkstra(Edge.weights, src, dest);
			nodeConnector.setShortestPath(shortestPath);
			console.log("The available path will be displayed in Blue Color \nThe shortest path will be displayed in Red Color");
		}
	});
});
