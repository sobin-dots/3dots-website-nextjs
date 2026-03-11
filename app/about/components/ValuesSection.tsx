export default function ValuesSection() {
    const values = [
        {
            num: "01",
            title: "Build What Matters",
            desc: "Every decision we make is driven by building products that users love and businesses rely on."
        },
        {
            num: "02",
            title: "Excellence",
            desc: "We strive to build reliable, scalable, and well-crafted software using modern technologies and best practices."
        },
        {
            num: "03",
            title: "Ownership",
            desc: "We take responsibility for the work we do and the impact it creates."
        },
        {
            num: "04",
            title: "Growth",
            desc: "Technology evolves constantly, and we grow with it by learning, experimenting, and improving."
        }
    ];

    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-16">
                Our core <span className="font-medium text-brand">Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 text-left hover:shadow-xl transition-shadow relative overflow-hidden group flex flex-col h-full">
                        <div className="text-7xl font-black text-slate-100 absolute top-4 right-4 group-hover:text-brand/5 transition-colors z-0">
                            {v.num}
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col">
                            <h4 className="text-2xl font-medium text-slate-800 mb-4">{v.title}</h4>
                            <p className="text-slate-600 font-light leading-relaxed">{v.desc}</p>
                        </div>

                        <div className="w-12 h-1 bg-slate-200 group-hover:bg-brand mt-8 transition-colors relative z-10"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
