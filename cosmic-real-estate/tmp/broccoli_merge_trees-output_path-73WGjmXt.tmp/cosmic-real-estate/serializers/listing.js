define('cosmic-real-estate/serializers/listing', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    function buildNormalizeListing(source) {
        return {
            id: source._id,
            slug: source.slug,
            content: source.content,
            title: source.title,
            price: source.metadata.price,
            address: source.metadata.address,
            profileImage: source.metadata.profile.url,
            style: source.metadata.style,
            neighborhood: source.metadata.neighborhood,
            beds: source.metadata.beds,
            baths: source.metadata.baths,
            squareFeet: source.metadata.square_feet,
            zipCode: source.metadata.zip_code,
            upvotes: source.metadata.upvotes
        };
    }
    exports.default = _emberData.default.RESTSerializer.extend({
        primaryKey: 'slug',
        normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {
            if (payload.objects) {
                var normalizedListings = payload.objects.map(function (listing) {
                    return buildNormalizeListing(listing);
                });
                payload = {
                    listings: normalizedListings
                };
            } else {
                var normalizedListing = buildNormalizeListing(payload.object);
                payload = {
                    listing: normalizedListing
                };
            }
            return this._super(store, primaryModelClass, payload, id, requestType);
        },
        serialize: function serialize(snapshot, options) {
            var json = this._super.apply(this, arguments);
            var payload = {
                "slug": snapshot.id,
                "metafields": [{
                    "required": true,
                    "value": json.price,
                    "key": "price",
                    "title": "Price",
                    "type": "text",
                    "children": null
                }, {
                    "required": true,
                    "value": json.address,
                    "key": "address",
                    "title": "Address",
                    "type": "text",
                    "children": null
                }, {
                    "value": json.profileImage.split('/').slice(-1)[0],
                    "key": "profile",
                    "title": "Profile",
                    "type": "file",
                    "children": null,
                    "url": json.profileImage,
                    "imgix_url": "https://cosmicjs.imgix.net/" + json.profileImage.split('/').slice(-1)[0]
                }, {
                    "required": true,
                    "options": [{
                        "value": "House"
                    }, {
                        "value": "Apartment"
                    }, {
                        "value": "Condo"
                    }],
                    "value": json.style,
                    "key": "style",
                    "title": "Style",
                    "type": "radio-buttons",
                    "children": null
                }, {
                    "value": json.beds,
                    "key": "beds",
                    "title": "Beds",
                    "type": "text",
                    "children": null
                }, {
                    "value": json.baths,
                    "key": "baths",
                    "title": "Baths",
                    "type": "text",
                    "children": null
                }, {
                    "value": json.squareFeet,
                    "key": "square_feet",
                    "title": "Square Feet",
                    "type": "text",
                    "children": null
                }, {
                    "required": true,
                    "value": json.neighborhood,
                    "key": "neighborhood",
                    "title": "Neighborhood",
                    "type": "text",
                    "children": null
                }, {
                    "required": true,
                    "value": json.zipCode,
                    "key": "zipcode",
                    "title": "zipcode",
                    "type": "text",
                    "children": null
                }, {
                    "value": json.upvotes,
                    "key": "upvotes",
                    "title": "Upvotes",
                    "type": "text",
                    "children": null
                }]
            };
            return payload;
        }
    });
});