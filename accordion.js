(function() {
	"use strict";
	window.AccSol = {
	
		deck: [],
		placed: [],
		ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
		suits: ["Clubs", "Diamonds", "Hearts", "Spades"],
		SUIT: 0,
		RANK: 1,
		changed: false,
		
		init: function() {
			$('#start_button').click(function() {
				AccSol.makeDeck();
				var res = AccSol.shuffle();
				if (res) AccSol.deal();
			});
		},
		
		makeDeck: function() {
			//reset!
			this.deck = [];
			this.placed = [];
		
			var i, j;
			for (i = 0; i < this.suits.length; i++) {
				for (j = 0; j < this.ranks.length; j++) {
					this.deck.push( [ this.suits[i], this.ranks[j] ] );
				}
			}
		},
		
		/**
		 * Randomize array element order in-place.
		 * Using Durstenfeld shuffle algorithm.
		 */
		shuffle: function() {
			for (var i = 0; i < this.deck.length; i++) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = this.deck[i];
				this.deck[i] = this.deck[j];
				this.deck[j] = temp;
			}
			
			return true;
		},
		
		deal: function() {
			for (var i = 0; i < this.deck.length; i++) {
				this.placeCard(this.deck[i]);
				this.refreshPlaced();
			}
			
			console.log(this.deck);
		},
		
		placeCard: function(card) {
			this.changed = false;
		
			//add it to the end
			this.placed.push( card );
			
			//run our checks
			for (var i = this.placed.length - 1; i >= 0; i--) {
				//changed? start again...
				if (this.changed) {
					i = (this.placed.length - 1);
					this.changed = false;
				}
				
				this.matchCards(i);
			}
		},
		
		//check for matches
		// c = card we're checking;
		matchCards: function(c) {
		
			//first card
			if (c == 0) return;
			
			var card = this.placed[c];
			
			//outer check first
			if (c > 2) {
				if (this.placed[c][this.RANK] == this.placed[c-3][this.RANK] || this.placed[c][this.SUIT] == this.placed[c-3][this.SUIT]) {
					//console.log('outer = '+this.placed[c][this.RANK] +this.placed[c][this.SUIT] + ' = ' + this.placed[c-3][this.RANK]+ this.placed[c-3][this.SUIT]);
					this.placed.splice(c-3, 1, this.placed[c]);
					this.placed.splice(c, 1);
					//console.log(this.placed);
					this.changed = true;
					return;
				}
			}
		
			//inner check next
			if (card[this.RANK] == this.placed[c-1][this.RANK] || card[this.SUIT] == this.placed[c-1][this.SUIT]) {
				//console.log('inner = '+card[this.RANK] +card[this.SUIT] + ' = ' + this.placed[c-1][this.RANK]+ this.placed[c-1][this.SUIT]);
				this.placed.splice(c-1, 1, card);
				this.placed.splice(c, 1);
				//console.log(this.placed);
				this.changed = true;
			}
		},
		
		refreshPlaced: function() {
			var card, cardDiv;
			
			//clear the coffee table
			$('#coffee_table').html('');
			
			for (var i = 0; i < this.placed.length; i++) {
				card = this.placed[i];
				cardDiv = '<div class="card '+ card[this.SUIT] + '"><div class="rank">'+ card[this.RANK] + '</div><div class="ud_num">'+ card[this.RANK] + '</div></div>';
				//$('#coffee_table').append(' | '+ card[this.RANK] + card[this.SUIT] + ' | ');
				$('#coffee_table').append(cardDiv);
			}
		}
	
	}

	$(document).ready(function() {
		AccSol.init();
	});
	
})(jQuery);
