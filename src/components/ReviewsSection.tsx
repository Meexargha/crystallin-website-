import { useState, useEffect, FormEvent } from 'react';
import { REVIEWS_DATA } from '../data';
import { ReviewItem } from '../types';
import { MessageSquare, Star, Heart, ThumbsUp, Sparkles, Smile, PenTool, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [starCount, setStarCount] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize/hydrate from Local Storage if present, else fallback
  useEffect(() => {
    const stored = localStorage.getItem("crystal_inn_reviews");
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(REVIEWS_DATA);
      }
    } else {
      setReviews(REVIEWS_DATA);
    }
  }, []);

  const handleLike = (reviewId: string) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === reviewId ? { ...r, likes: r.likes + 1 } : r);
      localStorage.setItem("crystal_inn_reviews", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    // Simulate standard manager replies based on user's feedback scores
    let reply = "Thank you so much for your feedback! We hope to serve you again during your transit via Kalyani Expressway!";
    if (starCount >= 5) {
      reply = "What a generous review! We're thrilled you enjoyed our culinary craft and warm rooms. We prepare every crab and lobster dish from scratch to honor your expectations!";
    } else if (starCount <= 2) {
      reply = "We apologize sincerely for your sub-optimum experience. We value your feedback on service speed and quality. Please contact our manager at 085858 49866 so we can resolve this immediately.";
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName,
      isLocalGuide: false,
      rating: starCount,
      relativeTime: "Just now",
      text: reviewText,
      likes: 0,
      reply
    };

    setReviews(prev => {
      const updated = [newReview, ...prev];
      localStorage.setItem("crystal_inn_reviews", JSON.stringify(updated));
      return updated;
    });

    // Reset
    setAuthorName("");
    setReviewText("");
    setStarCount(5);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000); // clear visual success
  };

  // Star breakdown calculation
  const breakdownStats = [
    { stars: 5, count: 28, percentage: 60 },
    { stars: 4, count: 12, percentage: 26 },
    { stars: 3, count: 3, percentage: 6 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 2, percentage: 4 }
  ];

  return (
    <div className="space-y-12">
      
      {/* Histogram & summary panel */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core numerical score */}
        <div className="flex flex-col justify-center items-center text-center space-y-2 border-r-0 md:border-r border-slate-100 last:border-0 grow shrink-0 py-4">
          <span className="text-6xl font-black text-slate-900 leading-none">4.2</span>
          
          <div className="flex items-center gap-0.5 text-amber-500">
            {[1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-amber-500" />)}
            <Star className="w-5 h-5 fill-amber-400 opacity-60" />
          </div>

          <p className="text-slate-500 text-xs font-semibold">Based on 46 Google reviews</p>
          <div className="text-[11px] bg-rose-50 text-rose-800 px-2.5 py-1 rounded font-bold border border-rose-100">
            Verified Expressway Stopover
          </div>
        </div>

        {/* Histogram bars */}
        <div className="md:col-span-2 space-y-2.5 flex flex-col justify-center">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">Review Breakdown</h4>
          
          {breakdownStats.map((stat) => (
            <div key={stat.stars} className="flex items-center gap-3 text-xs text-slate-700">
              <span className="w-12 text-slate-600 font-medium whitespace-nowrap">{stat.stars} stars</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
              <span className="w-6 text-right text-slate-400 font-mono">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Reviews Layout: Write review forms on right vs Read list on left */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Read Reviews Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-rose-100">
            <h4 className="font-serif text-slate-900 font-bold text-lg">Verified Customer Reviews</h4>
            <span className="text-xs text-slate-500 font-medium">{reviews.length} total displayed</span>
          </div>

          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-100/80 hover:border-slate-200 transition-all space-y-4 shadow-xs">
                
                {/* Header author info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-sm">
                      {rev.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-950 text-xs sm:text-sm">{rev.author}</span>
                        {rev.isLocalGuide && (
                          <span className="bg-amber-100 text-amber-800 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider uppercase">
                            Local Guide
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {rev.reviewsCount ? `${rev.reviewsCount} reviews` : ''} 
                        {rev.photosCount ? ` · ${rev.photosCount} photos` : ''}
                        {` · ${rev.relativeTime}`}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, step) => (
                      <Star key={step} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Core review paragraph */}
                <p className="text-slate-700 text-xs leading-relaxed italic pr-2">
                  "{rev.text}"
                </p>

                {/* Actions & Likes count */}
                <div className="flex items-center gap-3 text-xs">
                  <button 
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors font-medium text-[11px]"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful ({rev.likes})
                  </button>
                </div>

                {/* Manager reply card */}
                {rev.reply && (
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1">
                    <div className="flex items-center gap-1 text-rose-800 font-bold text-[10px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                      <span>Response from Crystal Inn Manager</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed leading-tight text-justify">
                      {rev.reply}
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Share experience board form */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <PenTool className="w-4.5 h-4.5 text-rose-400" />
              <h4 className="font-bold text-sm uppercase tracking-wider">Share Review</h4>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3 animate-in fade-in">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <div>
                  <h5 className="font-bold text-sm text-emerald-300">Feedback Published!</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">
                    Your view has been published. Check out the instant polite manager response on the left board!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                {/* Author Name */}
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-rose-400"
                  />
                </div>

                {/* Rating selection stars */}
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">Rating Score</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStarCount(star)}
                        className="p-1 focus:outline-hidden group"
                      >
                        <Star 
                          className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                            star <= starCount 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-600 hover:text-amber-300'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 font-bold ml-1">{starCount} / 5</span>
                  </div>
                </div>

                {/* Message body */}
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">Your Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How was the Veg Thali, Giant Lobster, or hourly lodge room? Takes long wait time?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-rose-400 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs tracking-wider uppercase py-3 rounded-xl transition-all shadow-md"
                >
                  Submit review
                </button>
              </form>
            )}

            <div className="text-[9px] text-slate-500 text-center uppercase tracking-wide flex items-center justify-center gap-1 mt-2">
              <Smile className="w-3 h-3" />
              <span>We value honest, transparent community reviews</span>
            </div>
          </div>
          
          {/* Quick Review Alert banner */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
            <h5 className="font-bold text-rose-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              Service Wait Note
            </h5>
            <p className="text-[11px] leading-relaxed">
              As some guests noted, fresh, customized culinary orders (like lobster, crabs) can take up to 25 mins. We appreciate your patience as we refuse to serve pre-heated foods!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
