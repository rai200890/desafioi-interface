class 
hotels.data.map(function(hotel) {
          return {type: 'hotel', object: {id: hotel.id, name: (hotel.name + ',' + hotel.city_name)}}
        }
