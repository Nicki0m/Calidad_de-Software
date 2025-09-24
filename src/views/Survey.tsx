import Survey from "../components/Survey";

export default function SurveyView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <Survey />
        </div>
      </section>
    </div>
  );
}