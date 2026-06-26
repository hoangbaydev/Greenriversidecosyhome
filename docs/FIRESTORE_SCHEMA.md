# Firestore Schema

## Collections

### `users`
Admin/editor accounts for CMS access.

| Field | Type | Description |
|-------|------|-------------|
| email | string | User email |
| displayName | string | Display name |
| role | string | `admin` or `editor` |
| createdAt | timestamp | Creation date |

### `rooms`
Accommodation listings.

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL slug |
| name | string | Room name |
| category | string | Room category |
| description | string | Full description |
| shortDescription | string | Card excerpt |
| amenities | string[] | Amenity list |
| occupancy | number | Max guests |
| priceFrom | number | Starting price |
| currency | string | Currency code |
| images | string[] | Image URLs |
| featured | boolean | Show on homepage |
| order | number | Sort order |
| published | boolean | Visibility |

### `tours`
Tour/experience listings.

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL slug |
| name | string | Tour name |
| description | string | Full description |
| shortDescription | string | Card excerpt |
| duration | string | e.g. "Full Day" |
| priceFrom | number | Starting price |
| currency | string | Currency code |
| highlights | string[] | Key highlights |
| images | string[] | Image URLs |
| featured | boolean | Show on homepage |
| order | number | Sort order |
| published | boolean | Visibility |

### `activities`
Weekly social activities.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Activity name |
| description | string | Description |
| dayOfWeek | string | Day of week |
| time | string | Start time |
| icon | string | Icon identifier |
| featured | boolean | Highlight |
| order | number | Sort order |

### `transportation`
Transport services.

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL slug |
| name | string | Service name |
| description | string | Full description |
| shortDescription | string | Card excerpt |
| priceFrom | number | Starting price |
| currency | string | Currency code |
| icon | string | Icon identifier |
| order | number | Sort order |
| published | boolean | Visibility |

### `gallery`
Photo gallery items.

| Field | Type | Description |
|-------|------|-------------|
| title | string | Image title |
| category | string | rooms, cafe, food, tours, activities, sunset, drone |
| imageUrl | string | Full image URL |
| thumbnailUrl | string | Optional thumbnail |
| order | number | Sort order |
| featured | boolean | Show on homepage |

### `reviews`
Guest reviews.

| Field | Type | Description |
|-------|------|-------------|
| guestName | string | Guest display name |
| country | string | Guest country |
| countryFlag | string | Country flag text or emoji |
| avatar | string | Optional avatar image URL |
| source | string | booking, airbnb, hostelworld, tripadvisor, or google |
| sourceUrl | string | Platform URL or direct review URL |
| rating | number | Review score, supports 1-5 or 1-10 |
| reviewTitle | string | Short review headline |
| reviewText | string | Review body |
| reviewDate | string | Review date |
| roomType | string | Room stayed in |
| stayDuration | string | e.g. 2 nights |
| travellerType | string | Solo, Couple, Family, Group |
| featured | boolean | Show on homepage when rating is high |
| displayOrder | number | Homepage/list display order |
| language | string | Review language code |

### `blog_posts`
Blog articles.

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL slug |
| title | string | Post title |
| excerpt | string | Summary |
| content | string | Full content |
| coverImage | string | Cover image URL |
| category | string | Category |
| tags | string[] | Tags |
| author | string | Author name |
| publishedAt | string | Publish date |
| featured | boolean | Featured post |
| published | boolean | Visibility |

### `homepage_content`
Homepage editable content. Document ID: `main`

| Field | Type | Description |
|-------|------|-------------|
| heroHeadline | string | Hero headline |
| heroSubheadline | string | Hero subheadline |
| heroImage | string | Hero background |
| whyChooseTitle | string | Section title |
| whyChooseItems | array | Feature cards |
| finalCtaTitle | string | CTA title |
| finalCtaSubtitle | string | CTA subtitle |

### `site_settings`
Global settings. Document ID: `main`

| Field | Type | Description |
|-------|------|-------------|
| siteName | string | Site name |
| tagline | string | Tagline |
| whatsappNumber | string | WhatsApp number |
| phone | string | Phone number |
| email | string | Email address |
| address | string | Physical address |
| googleMapsUrl | string | Maps link |
| socialLinks | object | Social media URLs |
| seo | object | SEO defaults |
| reviewRatings | object | Manual platform ratings for Reviews social proof |

### `contact_information`
Contact page content. Document ID: `main`

### `story_content`
Our Story page content. Document ID: `main`

### `cafe_content`
Eat & Drink page content. Document ID: `main`

## Storage Paths

```
hero/
rooms/
tours/
activities/
gallery/
cafe/
blog/
site/
reviews/
```
