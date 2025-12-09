const CASES = [
    {
      concept_name: 'Abstention doctrine'        
    },
    {
      concept_name: 'Actio libera in causa'        
    },
    {
      concept_name: 'Agent of record'        
    },
    {
      concept_name: 'Alternative liability'        
    },
    {
      concept_name: 'Audi alteram partem'        
    },
    {
      concept_name: 'Beneficium inventarii'        
    },
    {
      concept_name: 'Boulevard rule'        
    },
    {
      concept_name: 'Brady disclosure'        
    },
    {
      concept_name: 'Burden of proof (law)'        
    },
    {
      concept_name: 'Commanding precedent'        
    },
    {
      concept_name: 'Comparative negligence'        
    },
    {
      concept_name: 'Constitutional convention (political custom)'        
    },
    {
      concept_name: 'Contributory negligence'        
    },
    {
      concept_name: 'Crumbling skull rule'        
    },
    {
      concept_name: 'Desuetude'        
    },
    {
      concept_name: 'Discovery doctrine'        
    },
    {
      concept_name: 'Doctrine of cash equivalence'        
    },
    {
      concept_name: 'Doctrine of chances'        
    },
    {
      concept_name: 'Doctrine of foreign equivalents'        
    },
    {
      concept_name: 'Doctrine of necessity'        
    },
    {
      concept_name: 'Double aspect doctrine'        
    },
    {
      concept_name: 'Duty of care'        
    },
    {
      concept_name: 'Duty to rescue'        
    },
    {
      concept_name: 'Economic substance'        
    },
    {
      concept_name: 'Emergency'        
    },
    {
      concept_name: 'Equal authenticity rule'        
    },
    {
      concept_name: 'Equity (law)'        
    },
    {
      concept_name: 'Erie doctrine'        
    },
    {
      concept_name: 'Essential facilities doctrine'        
    },
    {
      concept_name: 'Everything which is not forbidden is allowed'        
    },
    {
      concept_name: 'Ex turpi causa non oritur actio'        
    },
    {
      concept_name: 'Exhausted combination doctrine'        
    },
    {
      concept_name: 'Finality (law)'        
    },
    {
      concept_name: 'First-sale doctrine'        
    },
    {
      concept_name: 'Floodgates principle'        
    },
    {
      concept_name: 'FTC v. Dean Foods Co.'        
    },
    {
      concept_name: 'Functionality doctrine'        
    },
    {
      concept_name: 'Fundamental breach'        
    },
    {
      concept_name: 'Good-faith exception'        
    },
    {
      concept_name: 'Homestead principle'        
    },
    {
      concept_name: 'Imputation (law)'        
    },
    {
      concept_name: 'In loco parentis'        
    },
    {
      concept_name: 'Incorporation of international law'        
    },
    {
      concept_name: 'Independent source doctrine'        
    },
    {
      concept_name: 'Inequality of bargaining power'        
    },
    {
      concept_name: 'Inevitable disclosure'        
    },
    {
      concept_name: 'Jurisprudence constante'        
    },
    {
      concept_name: 'Laches (equity)'        
    },
    {
      concept_name: 'Last clear chance'        
    },
    {
      concept_name: 'Learned intermediary'        
    },
    {
      concept_name: 'Legality'        
    },
    {
      concept_name: 'Loss of chance in English law'        
    },
    {
      concept_name: 'Male captus bene detentus'        
    },
    {
      concept_name: 'Maxims of equity'        
    },
    {
      concept_name: 'Maxwellisation'        
    },
    {
      concept_name: 'Merger doctrine (civil procedure)'        
    },
    {
      concept_name: 'Mistake (contract law)'        
    },
    {
      concept_name: 'Mount Laurel doctrine'        
    },
    {
      concept_name: 'Negligence'        
    },
    {
      concept_name: 'Nemo iudex in causa sua'        
    },
    {
      concept_name: 'Non bis in idem'        
    },
    {
      concept_name: 'Nonacquiescence'        
    },
    {
      concept_name: 'Nondelegation doctrine'        
    },
    {
      concept_name: 'Nulla poena sine culpa'        
    },
    {
      concept_name: 'Open mines doctrine'        
    },
    {
      concept_name: 'Pacta sunt servanda'        
    },
    {
      concept_name: 'Paraphrasing of copyrighted material'        
    },
    {
      concept_name: 'Peremptory norm'        
    },
    {
      concept_name: 'Physical proximity doctrine'        
    },
    {
      concept_name: 'Plain meaning rule'        
    },
    {
      concept_name: 'Preparation and attempt'        
    },
    {
      concept_name: 'Presumption'        
    },
    {
      concept_name: 'Presumption (Catholic canon law)'        
    },
    {
      concept_name: 'Presumption of innocence'        
    },
    {
      concept_name: 'Principle of legality in French criminal law'        
    },
    {
      concept_name: 'Privity of contract'        
    },
    {
      concept_name: 'Proportionality (law)'        
    },
    {
      concept_name: 'Prosecutorial discretion'        
    },
    {
      concept_name: 'Purcell principle'        
    },
    {
      concept_name: 'Qualified immunity'        
    },
    {
      concept_name: 'Qui facit per alium facit per se'        
    },
    {
      concept_name: 'Reasonable doubt'        
    },
    {
      concept_name: 'Remoteness in English law'        
    },
    {
      concept_name: 'Res ipsa loquitur'        
    },
    {
      concept_name: 'Res judicata'        
    },
    {
      concept_name: 'Reverse doctrine of equivalents'        
    },
    {
      concept_name: 'Safe harbor (law)'        
    },
    {
      concept_name: 'Spider in the web doctrine'        
    },
    {
      concept_name: 'Substance over form'        
    },
    {
      concept_name: 'Substantial certainty doctrine'        
    },
    {
      concept_name: 'Sufficient similarity'        
    },
    {
      concept_name: 'Tolling (law)'        
    },
    {
      concept_name: 'Transnational child protection'        
    },
    {
      concept_name: 'Unaccompanied minor'        
    },
    {
      concept_name: 'Unconscionability'        
    },
    {
      concept_name: 'Undue hardship'        
    },
    {
      concept_name: 'United States v. American Bell Telephone Co.'        
    },
    {
      concept_name: 'Valid when made'        
    },
    {
      concept_name: 'Vicarious liability'        
    },
    {
      concept_name: 'Volenti non fit injuria'        
    },
    {
      concept_name: 'Wrongdoing'        
    }
]


const Cases = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cases</h2>
      <p>This is the cases page. Create tiles that act as buttons for legal doctrines here.</p>
    </div>
  );
}

export default Cases;